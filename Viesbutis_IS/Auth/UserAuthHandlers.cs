using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Viesbutis_IS.Auth.Model;

namespace Viesbutis_IS.Auth
{
    public class UserAuthHandlers : AuthorizationHandler<ResourceOwnerRequirement, IUserCommonResource>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ResourceOwnerRequirement requirement, IUserCommonResource resource)
        {
            if(context.User.IsInRole(HotelRoles.Admin) ||
                context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) == resource.UserID)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
    public record ResourceOwnerRequirement : IAuthorizationRequirement;
}
