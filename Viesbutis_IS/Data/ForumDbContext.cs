﻿using Microsoft.EntityFrameworkCore;
using Viesbutis_IS.Data.Entities;

namespace Viesbutis_IS.Data
{
    public class ForumDbContext : DbContext
    {
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Corpuss> Corpusses { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = Viesbutis_IS;");
        }
    }
}
