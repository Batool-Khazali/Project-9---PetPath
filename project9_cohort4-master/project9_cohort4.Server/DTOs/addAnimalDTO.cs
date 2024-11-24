using Microsoft.AspNetCore.Http; // Import necessary namespace for IFormFile

namespace project9_cohort4.Server.DTOs
{
    public class AddAnimalDTO
    {
        public string Name { get; set; } = null!;
        public string Species { get; set; } = null!;
        public string? Breed { get; set; }
        public int? Age { get; set; }
        public string? Size { get; set; }
        public string? Temperament { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Description { get; set; }
        public string? AdoptionStatus { get; set; }

        // Properties for images
        public IFormFile? Image1 { get; set; }  // Handling images as file uploads
        public IFormFile? Image2 { get; set; }
        public IFormFile? Image3 { get; set; }

        // Shelter and category
        public int ShelterId { get; set; }
        public int CategoryId { get; set; }
    }

}