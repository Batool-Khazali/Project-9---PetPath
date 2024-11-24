using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class AdoptionApplication
{
    public int ApplicationId { get; set; }

    public int UserId { get; set; }

    public int AnimalId { get; set; }

    public DateTime? ApplicationDate { get; set; }

    public string? Status { get; set; }

    public bool? IsReceived { get; set; }

    public string? UserMedicalStatus { get; set; }

    public string? UserFlatType { get; set; }

    public string? UserFinaincalStatus { get; set; }

    public string? UserLivingStatus { get; set; }

    public string? UserMoreDetails { get; set; }

    public virtual Animal Animal { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
