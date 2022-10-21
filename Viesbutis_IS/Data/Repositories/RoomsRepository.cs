using Microsoft.EntityFrameworkCore;
using Viesbutis_IS.Data.Entities;

namespace Viesbutis_IS.Data.Repositories
{
    public interface IRoomsRepository
    {
        Task<IReadOnlyList<Room>> GetRoomsAsync(int hotelsId, int corpussId);
        Task<Room?> GetRoomAsync(int hotelsId, int corpussId, int id);
        Task CreateRoomAsync(Room room, int corpussId);
        Task UpdateRoomAsync(Room room);
        Task DeleteRoomAsync(Room room);
        bool CheckHotelAndCorpuss(int hotelsId, int corpussId);

    }
    public class RoomsRepository : IRoomsRepository
    {
        private readonly ForumDbContext _forumDbContext;
        public RoomsRepository(ForumDbContext dbContext)
        {
            _forumDbContext = dbContext;
        }
        public async Task CreateRoomAsync(Room room, int corpussId)
        {
           
            var corpuss = _forumDbContext.Corpusses.FirstOrDefault(c => c.CorpussId == corpussId);
            room.Corpuss = corpuss;
            _forumDbContext.Rooms.Add(room);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteRoomAsync(Room room)
        {
            _forumDbContext.Rooms.Remove(room);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Room>> GetRoomsAsync(int hotelsId, int corpussId)
        {
            return await _forumDbContext.Rooms.Where(r => r.Corpuss.Hotel.HotelId == hotelsId 
            && r.Corpuss.CorpussId == corpussId).ToListAsync();
        }

        public async Task<Room?> GetRoomAsync(int hotelsId, int corpussId, int id)
        {
            return await _forumDbContext.Rooms.
                FirstOrDefaultAsync(r => r.Corpuss.Hotel.HotelId == hotelsId 
                && r.Corpuss.CorpussId == corpussId && r.Id == id);
        }

        public async Task UpdateRoomAsync(Room room)
        {
            _forumDbContext.Rooms.Update(room);
            await _forumDbContext.SaveChangesAsync();
        }
        public bool CheckHotelAndCorpuss(int hotelsId, int corpussId)
        {
            if (_forumDbContext.Hotels.Find(hotelsId) == null)
                return false;
            else if (_forumDbContext.Corpusses.Find(corpussId) == null)
                return false;
            else return true;
        }
    }
}
