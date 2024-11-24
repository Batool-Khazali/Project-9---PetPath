namespace project9_cohort4.Server.DTOs
{
    public class ServiceDto
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } // Service name
        public string Description { get; set; } // Service description
        public string SubDescription { get; set; }
        public string Image { get; set; } // Optional: Add an image URL if needed
        public decimal Price { get; set; } // Optional: Add a price property if needed
    }
}
