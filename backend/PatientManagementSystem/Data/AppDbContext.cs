using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using PatientManagementSystem.Models;

namespace PatientManagementSystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

            // Seed Admin & User accounts
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), Role = "Admin" },
                new User { Id = 2, Username = "user", PasswordHash = BCrypt.Net.BCrypt.HashPassword("user123"), Role = "User" }
            );
        }
    }
}
