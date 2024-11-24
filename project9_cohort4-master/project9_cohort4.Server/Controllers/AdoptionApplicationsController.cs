using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.Models;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Email_Helper;
using Microsoft.IdentityModel.Tokens;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptionApplicationsController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly EmailHelper _emailHelper; // Change this to EmailHelper
        private readonly EmailService _emailService;

        public AdoptionApplicationsController(MyDbContext context, EmailHelper emailHelper, EmailService emailService)
        {
            _context = context;
            _emailHelper = emailHelper; // Assign emailHelper in constructor
            _emailService = emailService;
        }


        // GET: api/AdoptionApplications
        [HttpGet]
        public IActionResult GetAdoptionApplications()
        {
            var applications = _context.AdoptionApplications.ToList();
            return Ok(applications);
        }

        // GET: api/AdoptionApplications/5
        [HttpGet("{id}")]
        public IActionResult GetAdoptionApplication(int id)
        {
            var adoptionApplication = _context.AdoptionApplications.Find(id);

            if (adoptionApplication == null)
            {
                return NotFound();
            }

            return Ok(adoptionApplication);
        }

        // PUT: api/AdoptionApplications/5
        [HttpPut("{id}")]
        public IActionResult PutAdoptionApplication(int id, [FromBody] UpdateAdoptionApplicationDTO adoptionApplicationDto)
        {
            var existingApplication = _context.AdoptionApplications.Find(id);

            if (existingApplication == null)
            {
                return NotFound();
            }

            existingApplication.UserMedicalStatus = adoptionApplicationDto.UserMedicalStatus;
            existingApplication.UserFlatType = adoptionApplicationDto.UserFlatType;
            existingApplication.UserFinaincalStatus = adoptionApplicationDto.UserFinancialStatus;
            existingApplication.UserLivingStatus = adoptionApplicationDto.UserLivingStatus;
            existingApplication.UserMoreDetails = adoptionApplicationDto.UserMoreDetails;
            existingApplication.Status = adoptionApplicationDto.Status;

            _context.AdoptionApplications.Update(existingApplication);
            _context.SaveChanges();

            return Ok(existingApplication);
        }

        // POST: api/AdoptionApplications
        [HttpPost]
        public IActionResult PostAdoptionApplication([FromBody] AddAdoptionApplicationDTO adoptionApplicationDto)
        {
            try
            {
                if (adoptionApplicationDto == null)
                {
                    return BadRequest("Empty form");
                }

                var newApplication = new AdoptionApplication
                {
                    UserId = adoptionApplicationDto.UserId,
                    AnimalId = adoptionApplicationDto.AnimalId,
                    UserMedicalStatus = adoptionApplicationDto.UserMedicalStatus,
                    UserFlatType = adoptionApplicationDto.UserFlatType,
                    UserFinaincalStatus = adoptionApplicationDto.UserFinaincalStatus,
                    UserLivingStatus = adoptionApplicationDto.UserLivingStatus,
                    UserMoreDetails = adoptionApplicationDto.UserMoreDetails,
                    ApplicationDate = adoptionApplicationDto.ApplicationDate ?? DateTime.Now,
                    Status = "Pending"
                };

                _context.AdoptionApplications.Add(newApplication);
                _context.SaveChanges();

                // Send email
                _emailHelper.SendMessage(adoptionApplicationDto.UserName, adoptionApplicationDto.UserEmail,
                    "Adoption Application Received", $"Thank you for your application for animal .");

                return CreatedAtAction(nameof(GetAdoptionApplication), new { id = newApplication.ApplicationId }, newApplication);
            }
            catch (Exception ex)
            {
                // Log exception details
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Log and return error
            }
        }

        // DELETE: api/AdoptionApplications/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAdoptionApplication(int id)
        {
            var adoptionApplication = _context.AdoptionApplications.Find(id);
            if (adoptionApplication == null)
            {
                return NotFound();
            }

            _context.AdoptionApplications.Remove(adoptionApplication);
            _context.SaveChanges();

            return NoContent();
        }

        private bool AdoptionApplicationExists(int id)
        {
            return _context.AdoptionApplications.Any(e => e.ApplicationId == id);
        }



        ////////////////////////////////////// for admin
        [HttpGet("allAdoptionRequestsForAdmin")]
        public IActionResult allAdoptionRequestsForAdmin()
        {
            var requests = _context.AdoptionApplications
                .Include(e => e.User)
                .Include(a => a.Animal)
                .Select(x => new AdminAdoptionRequestsDTO
                {
                    ApplicationId = x.ApplicationId,
                    UserName = x.User.FullName,
                    AnimalName = x.Animal.Name,
                    AnimalImage = x.Animal.Image1,
                    AnimalId = x.AnimalId,
                    Status = x.Status,
                    ApplicationDate = x.ApplicationDate,
                    IsReceived = x.IsReceived,
                    UserMedicalStatus = x.UserMedicalStatus,
                    UserFlatType = x.UserFlatType,
                    UserFinaincalStatus = x.UserFinaincalStatus,
                    UserLivingStatus = x.UserLivingStatus,
                    UserMoreDetails = x.UserMoreDetails,
                })
                .ToList();

            if (requests.IsNullOrEmpty()) return NotFound("no request was found");

            return Ok(requests);
        }


        //[HttpPut("acceptAdoption/{animalId}/{requestId}")]
        //public IActionResult acceptAdoption(int animalId, int requestId)
        //{
        //    if (requestId <= 0) return BadRequest("invalid id");

        //    var request = _context.AdoptionApplications.FirstOrDefault(a => a.ApplicationId == requestId);

        //    var otherRequests = _context.AdoptionApplications
        //        .Where(a => a.AnimalId == animalId && a.ApplicationId != requestId)
        //        .ToList();

        //    if (request == null) return NotFound("the request was not found");

        //    request.Status = "Approved";
        //    _context.AdoptionApplications.Update(request);

        //    if (!otherRequests.IsNullOrEmpty())
        //    {
        //        foreach (var req in otherRequests)
        //        {
        //            req.Status = "Rejected";
        //        }
        //    }
        //    _context.AdoptionApplications.UpdateRange(otherRequests);

        //    _context.SaveChanges();

        //    return Ok("request accepted");

        //}


        [HttpPut("acceptAdoption/{animalId}/{requestId}")]
        public IActionResult AcceptAdoption(int animalId, int requestId)
        {
            if (requestId <= 0) return BadRequest("Invalid request ID");

            var request = _context.AdoptionApplications
                .Include(a => a.User)
                .Include(a => a.Animal)
                .FirstOrDefault(a => a.ApplicationId == requestId);

            if (request == null) return NotFound("The request was not found");

            var otherRequests = _context.AdoptionApplications
                .Where(a => a.AnimalId == animalId && a.ApplicationId != requestId)
                .Include(a => a.User)
                .Include(a => a.Animal)
                .ToList();

            // Approve the selected request
            request.Status = "Approved";
            _context.AdoptionApplications.Update(request);

            // Reject other requests for the same animal
            if (otherRequests.Any())
            {
                foreach (var req in otherRequests)
                {
                    req.Status = "Rejected";
                }
                _context.AdoptionApplications.UpdateRange(otherRequests);
            }

            // Save changes to the database
            _context.SaveChanges();

            // Get user details for the email
            var userEmail = request.User.Email;
            var userName = request.User.FullName; // Assuming there's a Name property in the User class
            var animalName = request.Animal.Name; // Assuming there's a Name property in the Animal class

            // Send acceptance email
            _emailService.SendAcceptance(userName, userEmail, animalName);

            // Send rejection emails to others
            foreach (var rejectedRequest in otherRequests)
            {
                var rejectedUserEmail = rejectedRequest.User.Email;
                var rejectedUserName = rejectedRequest.User.FullName;

                _emailService.SendRejection(rejectedUserName, rejectedUserEmail, animalName);
            }

            return Ok();
        }





    }
}
