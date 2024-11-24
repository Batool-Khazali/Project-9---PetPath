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
    public class ProfileController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ProfileController(MyDbContext db)
        {
            _db = db;
        }



        [HttpGet("getAllUsers")]
        public IActionResult getAllUsers()
        {
            var users = _db.Users.ToList();

            if (users.IsNullOrEmpty()) return NotFound("there's no user in the database");

            return Ok(users);
        }


        [HttpGet("getUserById/{userId}")]
        public IActionResult getUserById(int userId) 
        {
            if (userId <= 0) return NotFound("inavlid id");

            var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return NotFound("no user was found for this id");

            return Ok(user);
        }


        [HttpPut("editProfileInfo/{userId}")]
        public async Task<IActionResult> editProfileInfo (int userId, [FromForm] editInfoDTO info)
        {
            if (userId <= 0) return NotFound("inavlid id");
            if (info == null) return BadRequest("invalid input");

            var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return NotFound("no user was found for this id");

            if (Request.Form.Files.Count > 0 && info.Image != null && info.Image.Length > 0)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                var fileImage = Path.Combine(folder, info.Image.FileName);

                using (var stream = new FileStream(fileImage, FileMode.Create))
                {
                    await info.Image.CopyToAsync(stream);
                }

                user.Image = info.Image.FileName ?? user.Image;
                _db.Update(user);
            }

            user.FullName = info.Name ?? user.FullName;
            user.Image = user.Image;
            user.Address = info.Address ?? user.Address;
            user.Phone = info.Phone ?? user.Phone;

            _db.Update(user);
            _db.SaveChanges();
            return Ok("user info edited successfully");
        }


        [HttpPost("editPassword/{userId}")]
        public IActionResult editPassword(int userId, [FromForm] editPasswordDTO input)
        {
            if (userId <= 0) return NotFound("inavlid id");
            if (input == null) return BadRequest("invalid input");

            var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return NotFound("no user was found");

            // Verify the old password
            if (!PasswordHasher.VerifyPasswordHash(input.OldPassword, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Old password is incorrect.");

            // Hash the new password
            PasswordHasher.CreatePasswordHash(input.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _db.SaveChanges();
            return Ok("password edited successfully");
        }








    }
}
