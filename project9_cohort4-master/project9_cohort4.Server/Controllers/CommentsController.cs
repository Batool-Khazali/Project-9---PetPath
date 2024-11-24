using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CommentsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllComment/{postid}")]
        public IActionResult GetAllComment(int postid)
        {
            var comments = _db.Comments
                .Where(w => w.PostId == postid)
                .OrderByDescending(g => g.CreateDate)
                .Select(s => new
                {
                    s.CommentId,
                    s.UserId,
                    s.Content,
                    s.CreateDate,
                    User = new
                    {
                        s.User.FullName,
                        s.User.Image
                    }
                }
                ).ToList();
            return Ok(comments);
        }
        [HttpPost("AddComment/{postid}")]
        public IActionResult GetComment(int postid, [FromForm] AddCommentDTO addCommentDTO)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            if (addCommentDTO == null)
            {
                return BadRequest("Invalid data or null data");
            }
            var comments = new Comment
            {
                PostId = postid,
                UserId = addCommentDTO.UserId,
                CreateDate = System.DateTime.Now,
                Content = addCommentDTO.Content
            };
            _db.Comments.Add(comments);
            _db.SaveChanges();
            return Ok(comments);
        }
        [HttpGet("GetAllReplyByCommentId/{commentId}")]
        public IActionResult GetAllReplyByCommentId(int commentId)
        {
            if (commentId <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var allreplay = _db.Replies
                .Where(x => x.CommentId == commentId)
                .Select(x => new
                {
                    x.User.FullName,
                    x.User.Image,
                    x.CreateDate,
                    x.Content,
                }
                ).ToList();

            if (allreplay == null)
            {
                return NotFound("there is no replay");
            }

            return Ok(allreplay);
        }

        [HttpPost("ReplayOnComment")]
        public IActionResult ReplayOnComment([FromForm] ReplayOnCommentDTO replayOnCommentDTO)
        {
            if (replayOnCommentDTO == null)
            {
                return BadRequest("Invalid data or null data");
            }
            var replay = new Reply
            {
                CommentId = replayOnCommentDTO.CommentId,
                UserId = replayOnCommentDTO.UserId,
                CreateDate = System.DateTime.Now,
                Content = replayOnCommentDTO.Content,

            };

            _db.Replies.Add(replay);
            _db.SaveChanges();
            return Ok(replay);
        }
        // POST: api/likes
        [HttpPost("addLike")]
        public IActionResult LikePost([FromBody] LikeDto likeDto)
        {
            // Check if the like already exists
            var existingLike = _db.Likes
                .FirstOrDefault(l => l.PostId == likeDto.PostId && l.UserId == likeDto.UserId);

            if (existingLike != null)
            {
                // Toggle the like flag (like/unlike)
                existingLike.Flag = !existingLike.Flag;
                _db.SaveChanges();
                return Ok(existingLike);
            }
            else
            {
                // Add a new like
                var like = new Like
                {
                    PostId = likeDto.PostId,
                    UserId = likeDto.UserId,
                    Flag = true
                };
                _db.Likes.Add(like);
                _db.SaveChanges();
                return Ok(like);
            }
        }

        // GET: api/likes/{postId}
        [HttpGet("countLikes/{postId}")]
        public IActionResult GetLikesForPost(int postId)
        {
            var likeCount = _db.Likes
                .Where(l => l.PostId == postId && l.Flag == true)
                .Count();

            return Ok(likeCount);
        }
    }
}
