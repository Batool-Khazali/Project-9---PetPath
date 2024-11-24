namespace project9_cohort4.Server.DTOs
{
    public class UpdateAdoptionApplicationDTO
    {
        public string? UserMedicalStatus { get; set; }
        public string? UserFlatType { get; set; }
        public string? UserFinancialStatus { get; set; }
        public string? UserLivingStatus { get; set; }
        public string? UserMoreDetails { get; set; }
        public string? Status { get; set; } // Pending, Approved, Rejected
    }
}
