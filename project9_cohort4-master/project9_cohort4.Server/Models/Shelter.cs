using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Shelter
{
    public int ShelterId { get; set; }

    public string ShelterName { get; set; } = null!;

    public string? Description { get; set; }

    public string? ContactEmail { get; set; }

    public string? ContactPhone { get; set; }

    public string? OpenTime { get; set; }

    public string? CloseTime { get; set; }

    public string? OpenDay { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
