using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;
using project9_cohort4.Server.Services;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAndRegisterController : ControllerBase
    {

        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;


        public LoginAndRegisterController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }



        [HttpPost("register")]
        public IActionResult register([FromForm] registerDTO register)
        {
            if (register == null) return BadRequest("empty registration form");

            var existingUser = _db.Users.FirstOrDefault(u => u.Email == register.Email);

            if (existingUser != null)
                return BadRequest("The user already exists.");


            byte[] passwordHash, passwordSalt;

            PasswordHasher.CreatePasswordHash(register.Password, out passwordHash, out passwordSalt);

            var user = new User
            {
                FullName = register.FullName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Email = register.Email,
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(user);
        }




        [HttpPost("login")]
        public IActionResult Login([FromForm] LoginDTO login)
        {
            if (login == null) return BadRequest("empty login");

            var user = _db.Users.FirstOrDefault(x => x.Email == login.Email);

            if (user == null)  return BadRequest("user doesn't exist. please sign up.");

            var token = _tokenGenerator.GenerateToken(user.FullName);

            if (!PasswordHasher.VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Invalid username or password.");


                return Ok(new { Token = token, user });

        }



        [HttpGet("isAdmin/{userId}")]
        public IActionResult isAdmin (int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var user = _db.Users.FirstOrDefault(a => a.UserId == userId);

            if (user == null) return NotFound("no user was found");

            var check = user.IsAdmin;

            return Ok(check);
        }








    }
}
