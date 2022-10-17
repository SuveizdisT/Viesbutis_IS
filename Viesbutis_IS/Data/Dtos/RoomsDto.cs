namespace Viesbutis_IS.Data.Dtos
{
    // dėl corpuss corpuss ką daryt
    public record RoomDto(int roomId, int floor, double rating, int capacity, decimal price);
    public record CreateRoomDto(int roomId, int floor, double rating, int capacity, decimal price);
    public record UpdateRoomDto(double rating, int capacity, decimal price);
}
