using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PatientManagementSystem.Data;
using PatientManagementSystem.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using BCrypt.Net;

namespace PatientManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _key = "51b1c17486b832fb621b713ef4621bed6011a7f8c7c4333cd79ee1a06d01d1852b61822cee50db0a0bcbaf49e7a1efb8284af60c489369bc41f23ff9ce299c2f8884921fdd34343d0b6f26c952b0b832f59e324bc03d44c212429e9519b0a7691526f04f3e8a6adedd2d26b7f202f8f7d7f0884117b0a16da60b5fd06bb4367176a15873e5197969f98c463ce65e421b2d302783475a73f7303d2019abc6143530a5a2571389c13d6567fa834d2d15b6e80090c86240973ba80231bd7d3fe83ff6c6ccc4310b56c9f5f89c89ec039e231d2f73aef40ca3440395989602cd31e3cda6f1844824575a362764b5532f4eef461973d126f5cab7992faabfe30d1c97"; // Should be stored securely

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Username == user.Username))
                return BadRequest("Username already exists.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully!");
        }

        [HttpPost("login")]
public IActionResult Login([FromBody] UserDto userDto)
{
    Console.WriteLine($"Received Username: {userDto.Username}");
    Console.WriteLine($"Received Password: {userDto.Password}");

    // Find user in the database
    var existingUser = _context.Users.SingleOrDefault(u => u.Username == userDto.Username);

    // If user doesn't exist or password is incorrect, return Unauthorized
    if (existingUser == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, existingUser.PasswordHash))
    {
        return Unauthorized("Invalid username or password.");
    }
     var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, existingUser.Username),
                    new Claim(ClaimTypes.Role, existingUser.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
   
            return Ok(new { Token = tokenHandler.WriteToken(token), Role = existingUser.Role });
}

    }
}
