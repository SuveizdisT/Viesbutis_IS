using Microsoft.AspNetCore.Identity;
using Viesbutis_IS.Auth.Model;

namespace Viesbutis_IS.Data
{
    public class AuthSeeder
    {
        private UserManager<RestUser> userManager;
        private RoleManager<IdentityRole> roleManager;
        public AuthSeeder(UserManager<RestUser> user, RoleManager<IdentityRole> roles)
        {
            userManager = user;
            roleManager = roles;
        }
        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdmin();
        }
        private async Task AddAdmin()
        {
            var newAdmin = new RestUser()
            {
                UserName = "admin",
                Email = "admin@gmail.com"
            };
            var checkAdmin = await userManager.FindByNameAsync(newAdmin.UserName);
            if (checkAdmin == null)
            {
                var result = await userManager.CreateAsync(newAdmin,"AdminPassword!1");
                if (result.Succeeded)
                    await userManager.AddToRolesAsync(newAdmin,HotelRoles.allRoles);
            }
        }
        private async Task AddDefaultRoles()
        {
            foreach(var role in HotelRoles.allRoles)
            {
                var exists = await roleManager.RoleExistsAsync(role);
                if (!exists)
                    await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}
