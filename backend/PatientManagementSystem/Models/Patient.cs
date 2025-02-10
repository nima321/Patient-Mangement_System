using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PatientManagementSystem.Models
{
    public class Patient
    {
        [Key]  // Explicitly marking the Id as the primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // Ensures that Id is auto-incremented by the database
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string ContactNumber { get; set; }

        [Required]
        public string Address { get; set; }
    }
}
