using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;
using project9_cohort4.Server.Services;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly MyDbContext _db;

        private readonly ContactsEmailService _email;

        public ContactsController(MyDbContext db, ContactsEmailService email)
        {
            _db = db;
            _email = email;
        }



        [HttpPost("sendContactMessage")]
        public IActionResult sendContactMessage([FromForm] ContactFormDto contactForm)
        {
            if (contactForm == null) return BadRequest("empty form");

            var newMessage = new Contact
            {
                SenderName = contactForm.Name,
                SenderEmail = contactForm.Email,
                Subject = contactForm.Subject,
                Message = contactForm.Message,
                AdminReply = "no reply"
            };

            _db.Contacts.Add(newMessage);
            _db.SaveChanges();

            _email.SendContactEmailAsync(contactForm.Name, contactForm.Email, contactForm.Subject, contactForm.Message);

            return Ok(new { message = "Email sent successfully" });

        }





        [HttpPost("replyToContacts/{adminId}/{contactId}")]
        public IActionResult replyToContacts(int adminId, int contactId, [FromForm] ReplyFormDto replyForm)
        {
            if (replyForm == null) return BadRequest("empty form");
            if (adminId <= 0) return BadRequest("invalid admin id");
            if (contactId <= 0) return BadRequest("invalid contact id");

            var contact = _db.Contacts.FirstOrDefault(a => a.ContactId == contactId);

            contact.AdminReply = replyForm.Message;

            _db.Contacts.Update(contact);
            _db.SaveChanges();

            var admin = _db.Users.FirstOrDefault(x => x.UserId == adminId && x.IsAdmin == true);

            var adminEmail = admin.Email;

            _email.SendReplyEmailAsync(adminEmail, contact.SenderEmail, replyForm.Subject, replyForm.Message);
            return Ok(new { message = "Reply sent successfully" });

        }



        [HttpGet("getAllContactMessages")]
        public IActionResult getAllContactMessages()
        {
            var messages = _db.Contacts.ToArray();

            if (messages.Length == 0 || messages == null) return NotFound("there's no contact");

            return Ok(messages);
        }


        [HttpGet("getContactMessageById/{contactId}")]
        public IActionResult getContactMessageById(int contactId)
        {
            if (contactId <= 0) return BadRequest("invalid id");

            var contact = _db.Contacts.FirstOrDefault(x => x.ContactId == contactId);

            if (contact == null) return NotFound("the message wasn't found");

            return Ok(contact);
        }


        ////////// search contacts by user name or email
        ///

        [HttpGet("searchContacts/{text}")]
        public IActionResult searchContacts(string text)
        {
            if (string.IsNullOrEmpty(text)) return BadRequest("invalid search");

            var users = _db.Contacts
                .Where(a => a.SenderName.ToLower().Contains(text) || a.SenderEmail.ToLower().Contains(text))
                .ToList();

            if (users.IsNullOrEmpty()) return NotFound("no match was found");

            return Ok(users);
        }


        ////////// search contacts by admin reply
        ///

        [HttpGet("searchContactsByAdminReply/{text}")]
        public IActionResult searchContactsByAdminReply(string text)
        {
            if (string.IsNullOrEmpty(text)) return BadRequest("Invalid search");

            List<Contact> messages;

            if (text.Equals("noReply", StringComparison.OrdinalIgnoreCase))
            {
                messages = _db.Contacts
                    .Where(a => a.AdminReply == "no reply")
                    .ToList();
            }
            else if (text.Equals("replied", StringComparison.OrdinalIgnoreCase))
            {
                messages = _db.Contacts
                    .Where(a => a.AdminReply != "no reply")
                    .ToList();
            }
            else if (text.Equals("all", StringComparison.OrdinalIgnoreCase))
            {
                messages = _db.Contacts.ToList();
            }
            else
            {
                return BadRequest("Invalid search parameter");
            }

            if (messages.IsNullOrEmpty()) return NotFound("No match was found");

            return Ok(messages);
        }









    }
}
