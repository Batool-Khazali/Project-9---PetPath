using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Animals1Controller : ControllerBase
    {
        private readonly MyDbContext _context;

        public Animals1Controller(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAnimals()
        {
            var animals = _context.Animals.ToList();
            return Ok(animals);
        }

        [HttpGet("{id}")]
        public IActionResult GetAnimal(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
                return NotFound();

            return Ok(animal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimal(int id, [FromForm] AddAnimalDTO animalDto)
        {
            // Check if the animal exists
            var existingAnimal = await _context.Animals.FindAsync(id);
            if (existingAnimal == null)
            {
                return BadRequest($"Animal with ID {id} does not exist.");
            }

            // Check if the shelter exists
            var shelterExists = _context.Shelters.Any(s => s.ShelterId == animalDto.ShelterId);
            if (!shelterExists)
            {
                return BadRequest($"Shelter with ID {animalDto.ShelterId} does not exist.");
            }

            // Check if the category exists
            var categoryExists = _context.Categories.Any(c => c.CategoryId == animalDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest($"Category with ID {animalDto.CategoryId} does not exist.");
            }

            // Ensure the Animal_Images directory exists
            var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Animal_Images");
            if (!Directory.Exists(imagesDirectory))
            {
                Directory.CreateDirectory(imagesDirectory);
            }

            // Handling image updates if provided
            string? image1Url = existingAnimal.Image1;
            string? image2Url = existingAnimal.Image2;
            string? image3Url = existingAnimal.Image3;

            if (animalDto.Image1 != null)
            {
                image1Url = await SaveImageAsync(animalDto.Image1, imagesDirectory);
            }
            if (animalDto.Image2 != null)
            {
                image2Url = await SaveImageAsync(animalDto.Image2, imagesDirectory);
            }
            if (animalDto.Image3 != null)
            {
                image3Url = await SaveImageAsync(animalDto.Image3, imagesDirectory);
            }

            // Update other properties
            existingAnimal.Name = animalDto.Name;
            existingAnimal.Age = animalDto.Age;
            existingAnimal.Species = animalDto.Species;
            existingAnimal.Breed = animalDto.Breed;
            existingAnimal.Size = animalDto.Size;
            existingAnimal.Temperament = animalDto.Temperament;
            existingAnimal.SpecialNeeds = animalDto.SpecialNeeds;
            existingAnimal.Description = animalDto.Description;
            existingAnimal.AdoptionStatus = animalDto.AdoptionStatus;
            existingAnimal.ShelterId = animalDto.ShelterId;
            existingAnimal.CategoryId = animalDto.CategoryId;
            existingAnimal.Image1 = image1Url;
            existingAnimal.Image2 = image2Url;
            existingAnimal.Image3 = image3Url;

            _context.Animals.Update(existingAnimal);
            await _context.SaveChangesAsync();

            return Ok(existingAnimal);
        }



        [HttpPost]
        public async Task<IActionResult> PostAnimal([FromForm] AddAnimalDTO animalDto)
        {
            // Check if the shelter exists
            var shelterExists = _context.Shelters.Any(s => s.ShelterId == animalDto.ShelterId);
            if (!shelterExists)
            {
                return BadRequest($"Shelter with ID {animalDto.ShelterId} does not exist.");
            }

            // Check if the category exists
            var categoryExists = _context.Categories.Any(c => c.CategoryId == animalDto.CategoryId);
            if (!categoryExists)
            {
                return BadRequest($"Category with ID {animalDto.CategoryId} does not exist.");
            }

            // Ensure the Animal_Images directory exists
            var imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Animal_Images");
            if (!Directory.Exists(imagesDirectory))
            {
                Directory.CreateDirectory(imagesDirectory);
            }

            // Handling the image uploads
            string? image1Url = null, image2Url = null, image3Url = null;

            if (animalDto.Image1 != null)
            {
                image1Url = await SaveImageAsync(animalDto.Image1, imagesDirectory);
            }
            if (animalDto.Image2 != null)
            {
                image2Url = await SaveImageAsync(animalDto.Image2, imagesDirectory);
            }
            if (animalDto.Image3 != null)
            {
                image3Url = await SaveImageAsync(animalDto.Image3, imagesDirectory);
            }

            // Create a new Animal entity
            var newAnimal = new Animal
            {
                Name = animalDto.Name,
                Species = animalDto.Species,
                Breed = animalDto.Breed,
                Age = animalDto.Age,
                Size = animalDto.Size,
                Temperament = animalDto.Temperament,
                SpecialNeeds = animalDto.SpecialNeeds,
                Description = animalDto.Description,
                ShelterId = animalDto.ShelterId,
                CategoryId = animalDto.CategoryId,
                AddedAt = DateTime.UtcNow,

                // Assign the uploaded image URLs or paths
                Image1 = image1Url,
                Image2 = image2Url,
                Image3 = image3Url
            };

            _context.Animals.Add(newAnimal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnimal), new { id = newAnimal.AnimalId }, newAnimal);
        }

        // The SaveImageAsync method for saving images
        private async Task<string?> SaveImageAsync(IFormFile imageFile, string imagesDirectory)
        {
            if (imageFile.Length > 0)
            {
                // Create a unique file name for the image
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(imagesDirectory, fileName);

                // Save the image file to the specified directory
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                // Return the relative path that can be used to serve the image later
                return fileName;
            }

            return null;
        }





        [HttpDelete("{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
                return NotFound();

            _context.Animals.Remove(animal);
            _context.SaveChanges();

            return NoContent();
        }

        private bool AnimalExists(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }



        [HttpGet("{id}/random-animals")]
        public IActionResult GetRandomAnimalsBySpecies(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
                return NotFound();

            var randomAnimals = _context.Animals
                .Where(a => a.Species == animal.Species && a.AnimalId != id)
                .OrderBy(r => Guid.NewGuid())
                .Take(3)
                .ToList();

            return Ok(randomAnimals);
        }



        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Animal_Images", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");
            }
            return NotFound();
        }

    }
}
