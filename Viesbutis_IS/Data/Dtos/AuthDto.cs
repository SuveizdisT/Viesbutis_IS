using System.ComponentModel.DataAnnotations;

namespace Viesbutis_IS.Data.Dtos
{
   public record RegisterUserDto([Required]string UserName, [EmailAddress][Required]string Email, [Required]string Password);
   public record LoginDto(string UserName, string Password);
}
