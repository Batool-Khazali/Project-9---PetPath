using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoriesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut]
        [Route("UpdateCategory/{id}")]
        public IActionResult UpdateCategory(int id, [FromForm] CategoryDto categoryDto)
        {
            // Find the existing category in the database
            var existingCategory = _context.Categories.Find(id);
            if (existingCategory == null)
            {
                return NotFound(new { message = "Category not found" });
            }

            // Update the properties of the existing category
            existingCategory.Name = categoryDto.Name;
            existingCategory.Description = categoryDto.Description;

            // Check if an image was uploaded
            if (categoryDto.Image != null && categoryDto.Image.Length > 0)
            {
                // Ensure the "Upload" directory exists
                var uploadedFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Categories_Images");
                if (!Directory.Exists(uploadedFolder))
                {
                    Directory.CreateDirectory(uploadedFolder);
                }

                // Save the uploaded image file
                var fileImagePath = Path.Combine(uploadedFolder, categoryDto.Image.FileName);
                using (var stream = new FileStream(fileImagePath, FileMode.Create))
                {
                    categoryDto.Image.CopyTo(stream);
                }

                // Update the image property
                existingCategory.Image = categoryDto.Image.FileName; // Store just the file name or the relative path
            }

            // Save the changes to the database
            _context.SaveChanges();

            return Ok(new { message = "Category updated successfully", existingCategory });
        }



        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPost]
        [Route("AddCategory")]
        public IActionResult AddCategory([FromForm] CategoryDto categoryDto)
        {


            // Ensure the "Upload" directory exists
            var uploadedFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Categories_Images");
            if (!Directory.Exists(uploadedFolder))
            {
                Directory.CreateDirectory(uploadedFolder);
            }

            // Save the uploaded image file
            var fileImagePath = Path.Combine(uploadedFolder, categoryDto.Image.FileName);
            using (var stream = new FileStream(fileImagePath, FileMode.Create))
            {
                categoryDto.Image.CopyTo(stream);
            }




            var dataResponse = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description,
                Image = categoryDto.Image.FileName // Store just the file name or the relative path
            };

            _context.Categories.Add(dataResponse);
            _context.SaveChanges();

            return Ok(new { message = "Category added successfully", dataResponse });
        }



        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Categories_Images", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");
            }
            return NotFound();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
