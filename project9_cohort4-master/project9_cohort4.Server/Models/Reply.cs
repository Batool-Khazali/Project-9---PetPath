using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Reply
{
    public int ReplyId { get; set; }

    public int CommentId { get; set; }

    public int UserId { get; set; }

    public string? Content { get; set; }

    public DateTime? CreateDate { get; set; }

    public virtual Comment Comment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
