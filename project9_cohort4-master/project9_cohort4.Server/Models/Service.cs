using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;

    public string? Description { get; set; }

    public string? SubDescription { get; set; }

    public decimal Price { get; set; }

    public string? Duration { get; set; }

    public string? Image { get; set; }

    public DateTime? CreatedAt { get; set; }
}
