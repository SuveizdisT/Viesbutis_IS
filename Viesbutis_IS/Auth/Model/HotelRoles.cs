namespace Viesbutis_IS.Auth.Model
{
    public static class HotelRoles
    {
        public const string Admin = nameof(Admin);
        public const string RegisterUser = nameof(RegisterUser);

        public static readonly IReadOnlyCollection<string> allRoles = new[] { Admin, RegisterUser};
    }
}
