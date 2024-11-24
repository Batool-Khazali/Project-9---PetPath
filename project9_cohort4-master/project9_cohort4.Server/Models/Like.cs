using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Like
{
    public int LikeId { get; set; }

    public int UserId { get; set; }

    public int? PostId { get; set; }

    public bool? Flag { get; set; }

    public virtual Post? Post { get; set; }

    public virtual User User { get; set; } = null!;
}
