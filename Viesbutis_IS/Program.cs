using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Viesbutis_IS.Auth;
using Viesbutis_IS.Auth.Model;
using Viesbutis_IS.Data;
using Viesbutis_IS.Data.Repositories;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddIdentity<RestUser, IdentityRole>()
    .AddEntityFrameworkStores<ForumDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<ForumDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
    options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
    options.TokenValidationParameters.IssuerSigningKey =
    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
});

builder.Services.AddTransient<IHotelsRepository, HotelsRepository>();
builder.Services.AddTransient<ICorpussRepository, CorpussesRepository>();
builder.Services.AddTransient<IRoomsRepository, RoomsRepository>();
builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();


var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

app.Run();