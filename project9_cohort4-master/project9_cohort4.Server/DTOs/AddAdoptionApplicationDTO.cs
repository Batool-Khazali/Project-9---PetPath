using System.ComponentModel.DataAnnotations;

namespace project9_cohort4.Server.DTOs
{
    public class AddAdoptionApplicationDTO
    {
        public int UserId { get; set; }
        public int AnimalId { get; set; }
        public string UserMedicalStatus { get; set; }
        public string UserFlatType { get; set; }
        public string UserFinaincalStatus { get; set; }
        public string UserLivingStatus { get; set; }
        public string UserMoreDetails { get; set; }
        public string UserName { get; set; } // User's name for email
        public string UserEmail { get; set; } // User's email for email
        public DateTime? ApplicationDate { get; set; } // Optional application date
    }

}
