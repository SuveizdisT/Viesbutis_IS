using System.ComponentModel.DataAnnotations;
using Viesbutis_IS.Auth.Model;

namespace Viesbutis_IS.Data.Entities
{
    public class Hotel : IUserCommonResource
    {
        public int HotelId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        [Required]
        public string UserID { get; set; }
        public RestUser User { get; set; }

    }
}
