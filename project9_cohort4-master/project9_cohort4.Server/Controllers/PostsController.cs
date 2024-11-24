using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PostsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            var posts = _db.Posts
                .Where(w => w.IsAccept == true)
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
                        s.User.UserId,
                        s.User.FullName,
                    },
                    likesCount = s.Likes.Where(l => l.Flag == true).Count(),

                    Commentcount = s.Comments.Count(),
                }).ToList();

            return Ok(posts);
        }

        [HttpPost("AddPosts/{userID}")]
        public async Task<IActionResult> AddPosts(int userID, [FromForm] AddPostsDTO addpost)
        {
            if (addpost.StoryPhoto != null && addpost.StoryPhoto.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + addpost.StoryPhoto.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await addpost.StoryPhoto.CopyToAsync(fileStream);
                    }


                    var newPost = new Post
                    {
                        UserId = userID,
                        StoryPhoto = $"/images/{uniqueFileName}",
                        StoryContent = addpost.StoryContent,
                        StoryDate = System.DateTime.Now,
                        StoryTitle = addpost.StoryTitle,
                    };


                    _db.Posts.Add(newPost);
                    await _db.SaveChangesAsync();

                    return Ok(newPost);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }


            return BadRequest("Invalid data or missing image.");
        }
        [HttpPut("UpdatePostById/{id}")]
        public async Task<IActionResult> UpdatePostById(int id, [FromForm] AddPostsDTO addpost)
        {
            if (id <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            var postupdate = await _db.Posts.FirstOrDefaultAsync(x => x.PostId == id);
            if (postupdate == null)
            {
                return NotFound("No Post found with the specified ID.");
            }

            try
            {
                if (addpost.StoryPhoto != null && addpost.StoryPhoto.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");


                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + addpost.StoryPhoto.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await addpost.StoryPhoto.CopyToAsync(fileStream);
                    }


                    postupdate.StoryPhoto = $"/images/{uniqueFileName}";
                }


                postupdate.StoryContent = addpost.StoryContent ?? postupdate.StoryContent;
                postupdate.StoryTitle = addpost.StoryTitle ?? postupdate.StoryTitle;



                await _db.SaveChangesAsync();

                return Ok(postupdate);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpDelete("DeletePost/{id}")]
        public IActionResult DeletePostId(int id)
        {
            var post = _db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            // First, delete the related likes
            var likes = _db.Likes.Where(l => l.PostId == id).ToList();
            _db.Likes.RemoveRange(likes);

            // Then, delete related comments
            var comments = _db.Comments.Where(c => c.PostId == id).ToList();

            // Delete replies associated with the comments
            foreach (var comment in comments)
            {
                var replies = _db.Replies.Where(r => r.CommentId == comment.CommentId).ToList();
                _db.Replies.RemoveRange(replies);
            }

            _db.Comments.RemoveRange(comments);

            // Finally, delete the post
            _db.Posts.Remove(post);
            _db.SaveChanges();

            return Ok();
        }



        [HttpGet("PostDetailsById/{postid}")]
        public async Task<IActionResult> GetPostDetailsById(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var postdetails = await _db.Posts
                .Where(x => x.PostId == postid)
                .Select(s => new
                {
                    s.PostId,
                    s.StoryTitle,
                    s.StoryContent,
                    s.StoryDate,
                    s.StoryPhoto,
                    User = new
                    {
                        s.User.UserId,
                        s.User.FullName,
                    }
                }).ToListAsync();
            if (postdetails == null)
            {
                return NotFound("No Post found with the specified ID.");
            }
            return Ok(postdetails);
        }

        /////////////////////////// Admin Accept Post ///////////////////////////////

        [HttpPut("AcceptPostById/{postid}")]
        public async Task<IActionResult> AcceptPostById(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var post = await _db.Posts.FirstOrDefaultAsync(x => x.PostId == postid);
            if (post == null)
            {
                return NotFound("No Post found with the specified ID.");
            }
            post.IsAccept = true;

            _db.Posts.Update(post);
            await _db.SaveChangesAsync();
            return Ok(post);
        }
        [HttpGet("GetAllAcceptedPost")]
        public async Task<IActionResult> GetAllAcceptedPost()
        {
            var posts = await _db.Posts
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
                            }).ToListAsync();
            return Ok(posts);

        }


        [HttpGet("postnotaccepted")]
        public IActionResult postnotaccept()
        {
            var notaccept = _db.Posts.Where(x => x.IsAccept != true).OrderByDescending(w => w.StoryDate).Select(s => new
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
            }).ToArray();
            return Ok(notaccept);
        }


















    }
}
