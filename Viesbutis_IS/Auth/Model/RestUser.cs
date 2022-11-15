using Microsoft.AspNetCore.Identity;

namespace Viesbutis_IS.Auth.Model
{
    public class RestUser : IdentityUser
    {
        public string? MoreData { get; set; }
    }
}
