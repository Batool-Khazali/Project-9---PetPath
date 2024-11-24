using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Post
{
    public int PostId { get; set; }

    public int UserId { get; set; }

    public string? StoryContent { get; set; }

    public DateTime? StoryDate { get; set; }

    public string? StoryPhoto { get; set; }

    public string? StoryTitle { get; set; }

    public bool? IsAccept { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual User User { get; set; } = null!;
}
