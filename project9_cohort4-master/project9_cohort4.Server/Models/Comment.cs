using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int PostId { get; set; }

    public int UserId { get; set; }

    public string? Content { get; set; }

    public DateTime? CreateDate { get; set; }

    public virtual Post Post { get; set; } = null!;

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();

    public virtual User User { get; set; } = null!;
}
