namespace Viesbutis_IS.Data.Dtos
{
    public record HotelDto(int hotelId, string name, string city, string address, string phoneNumber);
    public record CreateHotelDto(string name, string city, string address, string phoneNumber);
    public record UpdateHotelDto(string address, string phoneNumber);
}
