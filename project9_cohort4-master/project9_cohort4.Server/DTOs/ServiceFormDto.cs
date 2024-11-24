// In project9_cohort4.Server.DTOs namespace
namespace project9_cohort4.Server.DTOs
{
    public class ServiceFormDto
    {
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public string SubDescription { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public string UserName { get; set; } // Example additional field
        public string UserEmail { get; set; } // Example additional field
    }
}
