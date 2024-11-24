using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.Models;
using project9_cohort4.Server.DTOs; // Add this using directive at the top


namespace project9_cohort4.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ServicesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Services
        [HttpGet]
        public IActionResult GetServices()
        {
            var services = _context.Services.ToList();
            return Ok(services);
        }

        // GET: api/Services/5
        [HttpGet("{id}")]
        public IActionResult GetService(int id)
        {
            var service = _context.Services.Find(id);

            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        // PUT: api/Services/5
        [HttpPut("{id}")]
        public IActionResult PutService(int id, Service service)
        {
            if (id != service.ServiceId)
            {
                return BadRequest();
            }

            _context.Entry(service).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Services
        [HttpPost]
        public IActionResult PostService(ServiceDto serviceDto)
        {
            // Map ServiceDto to Service entity
            var service = new Service
            {
                ServiceName = serviceDto.ServiceName,
                Description = serviceDto.Description,
                SubDescription = serviceDto.SubDescription,
                Image = serviceDto.Image,
                Price = serviceDto.Price
            };

            _context.Services.Add(service);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetService), new { id = service.ServiceId }, service);
        }

        // Add this inside ServicesController
        [HttpPost("submit-form")]
        public IActionResult SubmitServiceForm(ServiceFormDto serviceFormDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map ServiceFormDto to the Service entity
            var service = new Service
            {
                ServiceName = serviceFormDto.ServiceName,
                Description = serviceFormDto.Description,
                SubDescription = serviceFormDto.SubDescription,
                Image = serviceFormDto.Image,
                Price = serviceFormDto.Price
            };

            _context.Services.Add(service);
            _context.SaveChanges();

            // Optionally, return the created service and/or an acknowledgment
            return CreatedAtAction(nameof(GetService), new { id = service.ServiceId }, service);
        }

        // DELETE: api/Services/5
        [HttpDelete("{id}")]
        public IActionResult DeleteService(int id)
        {
            var service = _context.Services.Find(id);
            if (service == null)
            {
                return NotFound();
            }

            _context.Services.Remove(service);
            _context.SaveChanges();

            return NoContent();
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.ServiceId == id);
        }
    }
}
