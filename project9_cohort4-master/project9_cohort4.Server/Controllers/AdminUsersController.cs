using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    {

        private readonly MyDbContext _db;

        public AdminUsersController(MyDbContext db)
        {
            _db = db;
        }

        //[HttpPut("assignUserAsAdmin/{userId}")]
        //public IActionResult assignUserAsAdmin (int userId)
        //{
        //    if (userId <= 0) return BadRequest("invalid id");

        //    var user = _db.Users.FirstOrDefault(x => x.UserId == userId);

        //    if (user == null) return NotFound("the user was not found");

        //    user.IsAdmin = true;

        //    _db.Users.Update(user);
        //    _db.SaveChanges();

        //    return Ok($"user with id {userId} was assined as admin");
        //}



        ////////// search users by name or email
        ///

        [HttpGet("searchUser/{text}")]
        public IActionResult searchUser(string text)
        {
            if (string.IsNullOrEmpty(text)) return BadRequest("invalid search");

            var users = _db.Users
                .Where(a => a.FullName.ToLower().Contains(text) || a.Email.ToLower().Contains(text))
                .ToList();

            if (users.IsNullOrEmpty()) return NotFound("no match was found");

            return Ok(users);
        }










    }
}
