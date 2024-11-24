using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageController : ControllerBase
    {

        private readonly MyDbContext _db;

        public HomePageController(MyDbContext db)
        {
            _db = db;
        }




        ///////////////////////////////////// for the home page
        [HttpGet("getLatest3PostsForHP")]
        public IActionResult getLatest3PostsForHP()
        {
            var latest3 = _db.Posts
                .Where(x => x.IsAccept == true)
                .OrderByDescending(w => w.StoryDate)
                .Select(s => new
                {
                    s.PostId,
                    s.StoryTitle,
                    s.StoryContent,
                    s.StoryDate,
                    s.StoryPhoto,
                    User = new
                    {
                        s.User.FullName,
                    }
                })
                .Take(3)
                .ToList();

            if (latest3.IsNullOrEmpty()) return NotFound("no post was found");

            return Ok(latest3);
        }











    }
}
