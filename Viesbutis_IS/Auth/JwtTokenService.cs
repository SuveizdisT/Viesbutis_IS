using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Viesbutis_IS.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(string userName, string userID, IEnumerable<string> userRoles);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly SymmetricSecurityKey securityKey;
        private readonly string issuer;
        private readonly string audience;

        public JwtTokenService(IConfiguration config)
        {
            securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]));
            issuer = config["JWT:ValidIssuer"];
            audience = config["JWT:ValidAudience"];
        }
        public string CreateAccessToken(string userName, string userID, IEnumerable<string> userRoles)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, userName),
                new(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub,userID)
            };

            claims.AddRange(userRoles.Select(r => new Claim(ClaimTypes.Role, r)));

            var accessToken = new JwtSecurityToken
            (
                issuer,
                audience,
                claims,
                null,
                DateTime.UtcNow.AddHours(100),
                new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(accessToken);
        }
    }
}
 
