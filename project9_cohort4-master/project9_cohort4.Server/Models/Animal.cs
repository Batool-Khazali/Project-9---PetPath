using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Animal
{
    public int AnimalId { get; set; }

    public string Name { get; set; } = null!;

    public string? Species { get; set; }

    public string? Breed { get; set; }

    public int? Age { get; set; }

    public string? Size { get; set; }

    public string? Temperament { get; set; }

    public string? SpecialNeeds { get; set; }

    public string? Description { get; set; }

    public string? AdoptionStatus { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public string? Image3 { get; set; }

    public DateTime? AddedAt { get; set; }

    public int CategoryId { get; set; }

    public int ShelterId { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual Category Category { get; set; } = null!;

    public virtual Shelter Shelter { get; set; } = null!;
}
