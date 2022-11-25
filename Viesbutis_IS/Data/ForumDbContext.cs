using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Viesbutis_IS.Auth.Model;
using Viesbutis_IS.Data.Entities;

namespace Viesbutis_IS.Data
{
    public class ForumDbContext : IdentityDbContext<RestUser>
    {
        private IConfiguration configuration; 
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Corpuss> Corpusses { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public ForumDbContext(IConfiguration config)
        {
            configuration = config;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(configuration.GetValue<string>("PostgresSQLConnectionString"));
        }
    }
}
