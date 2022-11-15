using System.ComponentModel.DataAnnotations;
using Viesbutis_IS.Auth.Model;

namespace Viesbutis_IS.Data.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public int Floor { get; set; }

        public double Rating { get; set; }

        public int Capacity { get; set; }
        public decimal Price { get; set; }
        public Corpuss Corpuss { get; set; }
    }
}
