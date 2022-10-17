using Microsoft.EntityFrameworkCore;
using Viesbutis_IS.Data.Entities;
namespace Viesbutis_IS.Data.Repositories
{
    public interface IHotelsRepository
    {
        Task<IReadOnlyList<Hotel>> GetHotelsAsync();
        Task<Hotel?> GetHotelAsync(int id);
        Task CreateHotelAsync(Hotel hotel);
        Task UpdateHotelAsync(Hotel hotel);
        Task DeleteHotelAsync(Hotel hotel);

    }
    public class HotelsRepository : IHotelsRepository
    {
        private readonly ForumDbContext _forumDbContext;
        public HotelsRepository(ForumDbContext dbContext)
        {
            _forumDbContext = dbContext;
        }
        public async Task<IReadOnlyList<Hotel>> GetHotelsAsync()
        {
            return await _forumDbContext.Hotels.ToListAsync();
        }
        public async Task<Hotel?> GetHotelAsync(int id)
        {
            return await _forumDbContext.Hotels.FirstOrDefaultAsync(h => h.HotelId == id);
        }
        public async Task CreateHotelAsync(Hotel hotel)
        {
            _forumDbContext.Hotels.Add(hotel);
            await _forumDbContext.SaveChangesAsync();
        }
        public async Task UpdateHotelAsync(Hotel hotel)
        {
            _forumDbContext.Hotels.Update(hotel);
            await _forumDbContext.SaveChangesAsync();
        }
        public async Task DeleteHotelAsync(Hotel hotel)
        {
            _forumDbContext.Hotels.Remove(hotel);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
