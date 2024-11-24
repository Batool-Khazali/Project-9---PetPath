using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using project9_cohort4.Server.Models;

namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SheltersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SheltersController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetShelters()
        {
            var shelters = _context.Shelters.ToList();
            return Ok(shelters);
        }

        [HttpGet("{id}")]
        public IActionResult GetShelter(int id)
        {
            var shelter = _context.Shelters.Find(id);
            if (shelter == null)
                return NotFound();

            return Ok(shelter);
        }

        [HttpPut("{id}")]
        public IActionResult PutShelter(int id, [FromForm] addShelderDTO shelter)
        {
            var existShelter = _context.Shelters.Find(id);
            if (existShelter == null)
                return BadRequest();

            // Update existShelter with values from shelter DTO
            existShelter.ShelterName = shelter.ShelterName;
            existShelter.Description = shelter.Description;
            existShelter.ContactEmail = shelter.ContactEmail;
            existShelter.OpenTime = shelter.OpenTime;
            existShelter.CloseTime = shelter.CloseTime;
            existShelter.OpenDay = shelter.OpenDay;
            existShelter.ContactPhone = shelter.ContactPhone;
            existShelter.Address = shelter.Address;

            _context.Shelters.Update(existShelter);
            _context.SaveChanges();

            return Ok(existShelter);
        }


        [HttpPost]
        public IActionResult PostShelter([FromForm] addShelderDTO shelter)
        {
            var newShelter = new Shelter
            {
                ShelterName = shelter.ShelterName,
                Description = shelter.Description,
                ContactEmail = shelter.ContactEmail,
                OpenTime = shelter.OpenTime,
                CloseTime = shelter.CloseTime,
                OpenDay = shelter.OpenDay,
                ContactPhone = shelter.ContactPhone,
                Address = shelter.Address
            };

            _context.Shelters.Add(newShelter);
            _context.SaveChanges();

            return Ok(newShelter);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteShelter(int id)
        {
            var shelter = _context.Shelters.Find(id);
            if (shelter == null)
                return NotFound();

            _context.Shelters.Remove(shelter);
            _context.SaveChanges();

            return NoContent();
        }

        private bool ShelterExists(int id)
        {
            return _context.Shelters.Any(e => e.ShelterId == id);
        }
    }
}
