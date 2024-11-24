namespace project9_cohort4.Server.DTOs
{
    public class editInfoDTO
    {
        public string Name { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public IFormFile? Image { get; set; }
    }
}
