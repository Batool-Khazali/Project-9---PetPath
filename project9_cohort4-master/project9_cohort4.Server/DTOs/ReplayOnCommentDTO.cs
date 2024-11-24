using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.DTOs
{
    public class ReplayOnCommentDTO
    {

        public int CommentId { get; set; }

        public int UserId { get; set; }

        public string? Content { get; set; }

        
    }
}
