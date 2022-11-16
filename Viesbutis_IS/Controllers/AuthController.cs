using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Viesbutis_IS.Auth;
using Viesbutis_IS.Auth.Model;
using Viesbutis_IS.Data.Dtos;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api")]
    [AllowAnonymous]
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
            var user = await userManager.FindByNameAsync(registerDto.UserName);
            if (user != null)
                return BadRequest("Invalid request.");
            var newUser = new RestUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };
            var result = await userManager.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
                return BadRequest("User cannot be created.");
            await userManager.AddToRoleAsync(newUser, HotelRoles.RegisterUser);
            return CreatedAtAction(nameof(Register), new RegisterUser(newUser.Id,newUser.UserName,newUser.Email));
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
                return BadRequest("User name or password is invalid.");
            var validPassword = await userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!validPassword)
                return BadRequest("User name or password is invalid.");
            var role = await userManager.GetRolesAsync(user);
            var accessToken = tokenService.CreateAccessToken(user.UserName, user.Id, role);
            return Ok(new SuccessLoginDto(accessToken));
        }

    }
}
