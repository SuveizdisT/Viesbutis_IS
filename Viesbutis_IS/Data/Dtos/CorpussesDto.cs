namespace Viesbutis_IS.Data.Dtos
{
    // Dėl Hotel hotel ryšio neaišku, ką su juo daryti
    public record CorpussDto(string name, string type, int hotelId);
    public record CreateCorpussDto(string name, string type, int hotelId);
    public record UpdateCorpussDto(string type);
}
