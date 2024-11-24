namespace project9_cohort4.Server.DTOs
{
    public class CategoryDto
    {
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public IFormFile? Image { get; set; }
    }
}
