using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PatientManagementSystem.Data;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);

// Configure Database Connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT Authentication
var key = Encoding.UTF8.GetBytes("51b1c17486b832fb621b713ef4621bed6011a7f8c7c4333cd79ee1a06d01d1852b61822cee50db0a0bcbaf49e7a1efb8284af60c489369bc41f23ff9ce299c2f8884921fdd34343d0b6f26c952b0b832f59e324bc03d44c212429e9519b0a7691526f04f3e8a6adedd2d26b7f202f8f7d7f0884117b0a16da60b5fd06bb4367176a15873e5197969f98c463ce65e421b2d302783475a73f7303d2019abc6143530a5a2571389c13d6567fa834d2d15b6e80090c86240973ba80231bd7d3fe83ff6c6ccc4310b56c9f5f89c89ec039e231d2f73aef40ca3440395989602cd31e3cda6f1844824575a362764b5532f4eef461973d126f5cab7992faabfe30d1c97");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddAuthorization();

// Add Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS to allow the Angular frontend to communicate with the backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Allow Angular app domain
              .AllowAnyMethod()                      // Allow any HTTP method (GET, POST, etc.)
              .AllowAnyHeader()           // Allow any headers in requests
               .AllowCredentials();                   
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy
app.UseCors("AllowAngularApp");
app.UseHttpsRedirection();

// Apply middleware for Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers for API routes
app.MapControllers();

app.Run();
