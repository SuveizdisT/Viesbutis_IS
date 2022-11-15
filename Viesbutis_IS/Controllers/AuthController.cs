using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Viesbutis_IS.Auth;
using Viesbutis_IS.Auth.Model;
using Viesbutis_IS.Data.Dtos;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<RestUser> userManager;
        private readonly IJwtTokenService tokenService;
        public AuthController(UserManager<RestUser> UserManager, IJwtTokenService jwtToken)
        {
            userManager = UserManager;
            tokenService = jwtToken;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerDto)
        {

        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {

        }

    }
}
