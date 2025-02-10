using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatientManagementSystem.Data;
using PatientManagementSystem.Models;
using System.Linq;

namespace PatientManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientController(AppDbContext context)
        {
            _context = context;
        }

        //for getting the latest patteintNo or id
        [HttpGet("latest-patient-id")]
        
        public IActionResult GetLatestPatientId()
        {
            // Get the latest patient by ID (assumes that `id` is the primary key)
            var latestPatient = _context.Patients.OrderByDescending(p => p.Id).FirstOrDefault();
            
            // If no patients exist, start with 1 for the first patient
            if (latestPatient == null)
            {
                return Ok(new { latestPatientId = 0 });
            }

            // Return the latest patient ID
            return Ok(new { latestPatientId = latestPatient.Id });
        }



        // Only users with "User" or "Admin" roles can add patients
        [HttpPost("add")]
        [Authorize(Roles = "User,Admin")]
        public IActionResult AddPatient([FromBody] Patient patient)
        {
            if (patient == null)
                return BadRequest("Invalid patient data.");

            // Auto-increment of Id will happen automatically due to database configuration
            _context.Patients.Add(patient);
            _context.SaveChanges();

            return Ok(new { PatientId = patient.Id, Name = patient.Name });
        }

        // Only Admin can view all patients
        [HttpGet("list")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllPatients()
        {
            var patients = _context.Patients.ToList();
            return Ok(patients);
        }

        // Search for a patient by Id
        [HttpGet("search/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetPatientById(int id)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound("Patient not found.");

            return Ok(patient);
        }

        // Only Admin can edit patient details
        [HttpPut("edit/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditPatient(int id, [FromBody] Patient updatedPatient)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound("Patient not found.");

            patient.Name = updatedPatient.Name;
            patient.DateOfBirth = updatedPatient.DateOfBirth;
            patient.Gender = updatedPatient.Gender;
            patient.ContactNumber = updatedPatient.ContactNumber;
            patient.Address = updatedPatient.Address;

            _context.SaveChanges();
            return Ok(new { message = "Success" });
        }
        // Delete Patient (Admin Only)
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeletePatient(int id)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound("Patient not found.");

            _context.Patients.Remove(patient);
            _context.SaveChanges();

            return Ok("Patient deleted successfully.");
        }
    }
}
