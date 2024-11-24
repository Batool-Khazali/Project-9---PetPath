namespace project9_cohort4.Server.DTOs
{
    public class AdminAdoptionRequestsDTO
    {
        public int ApplicationId { get; set; }

        public string UserName { get; set; }

        public string AnimalName { get; set; }

        public string AnimalImage { get; set; }

        public int AnimalId { get; set; }

        public DateTime? ApplicationDate { get; set; }

        public string? Status { get; set; }

        public bool? IsReceived { get; set; }

        public string? UserMedicalStatus { get; set; }

        public string? UserFlatType { get; set; }

        public string? UserFinaincalStatus { get; set; }

        public string? UserLivingStatus { get; set; }

        public string? UserMoreDetails { get; set; }
    }
}
