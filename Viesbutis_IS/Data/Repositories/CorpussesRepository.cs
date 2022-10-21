using Microsoft.EntityFrameworkCore;
using Viesbutis_IS.Data.Entities;

namespace Viesbutis_IS.Data.Repositories
{
    public interface ICorpussRepository
    {
        Task<IReadOnlyList<Corpuss>> GetCorpussesAsync(int hotelsId);
        Task<Corpuss?> GetCorpussAsync(int hotelsId, int id);
        Task CreateCorpussAsync(Corpuss corpuss, int hotelsId);
        Task UpdateCorpussAsync(Corpuss corpuss);
        Task DeleteCorpussAsync(Corpuss corpuss);
        bool CheckHotel(int hotelsId);

    }
    public class CorpussesRepository : ICorpussRepository
    {
        private readonly ForumDbContext _forumDbContext;
        public CorpussesRepository(ForumDbContext dbContext)
        {
            _forumDbContext = dbContext;
        }
        public async Task CreateCorpussAsync(Corpuss corpuss, int hotelsId)
        {
            var hotel = _forumDbContext.Hotels.FirstOrDefault(h => h.HotelId == hotelsId);

            corpuss.Hotel = hotel;
            _forumDbContext.Corpusses.Add(corpuss);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteCorpussAsync(Corpuss corpuss)
        {
            _forumDbContext.Corpusses.Remove(corpuss);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Corpuss>> GetCorpussesAsync(int hotelsId)
        { 
            return await _forumDbContext.Corpusses.Where(c => c.Hotel.HotelId == hotelsId).ToListAsync();
        }

        public async Task<Corpuss?> GetCorpussAsync(int hotelsId, int id)
        {
            return await _forumDbContext.Corpusses.
                FirstOrDefaultAsync(c => c.Hotel.HotelId == hotelsId && c.CorpussId == id);
        }

        public async Task UpdateCorpussAsync(Corpuss corpuss)
        {
            _forumDbContext.Corpusses.Update(corpuss);
            await _forumDbContext.SaveChangesAsync();
        }
        public bool CheckHotel(int hotelsId)
        {
            var hotel = _forumDbContext.Hotels.Find(hotelsId);
            if (hotel == null)
                return false;
            else return true;
        }
    }
}
