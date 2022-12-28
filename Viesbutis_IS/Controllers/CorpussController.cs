using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Viesbutis_IS.Auth.Model;
using Viesbutis_IS.Data.Dtos;
using Viesbutis_IS.Data.Entities;
using Viesbutis_IS.Data.Repositories;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api/hotels/{hotelsId}/corpusses")]
    public class CorpussController : ControllerBase
    {
        private readonly ICorpussRepository _corpussRepository;
        public CorpussController(ICorpussRepository corpussRepository)
        {
            _corpussRepository = corpussRepository;
        }
        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<CorpussDto>> GetAll(int hotelsId)
        {
            var corpuss = await _corpussRepository.GetCorpussesAsync(hotelsId);
            return corpuss.Select(c => new CorpussDto(c.CorpussId, c.Name,c.Type, hotelsId));
        }
        //api/hotels/{hotelsId}/corpusses/{corpussId}
        [HttpGet]
        [Route("{corpussId:int}")]
        public async Task<ActionResult<CorpussDto>> Get(int hotelsId, int corpussId)
        {
            var corpuss = await _corpussRepository.GetCorpussAsync(hotelsId, corpussId);
            if (corpuss == null)
                return NotFound();
            return new CorpussDto(corpuss.CorpussId, corpuss.Name,corpuss.Type, hotelsId);
        }
        [HttpPost]
        [Route("")]
        [Authorize(Roles = HotelRoles.Admin)]
        public ActionResult Create(int hotelsId, CreateCorpussDto createCorpuss)
        {
            
            var corpuss = new Corpuss
            {
                Name = createCorpuss.name,
                Type = createCorpuss.type,
                Hotel = null
            };
            var flag = _corpussRepository.CheckHotel(hotelsId);
            if (flag)
            {
                _corpussRepository.CreateCorpussAsync(corpuss, hotelsId);

                return Created("", new CorpussDto(corpuss.CorpussId, corpuss.Name, corpuss.Type, hotelsId));
            }
            else return NotFound();
        }
        [HttpPut]
        [Route("{corpussId}")]
        [Authorize(Roles = HotelRoles.Admin)]
        public async Task<ActionResult<CorpussDto>> Update(int hotelsId, int corpussId, UpdateCorpussDto updateCorpuss)
        {
            var corpuss = await _corpussRepository.GetCorpussAsync(hotelsId,corpussId);
            if (corpuss == null)
                return NotFound();
            corpuss.Type = updateCorpuss.type;
            await _corpussRepository.UpdateCorpussAsync(corpuss);
            return Ok(new CorpussDto(corpuss.CorpussId, corpuss.Name, corpuss.Type, hotelsId));
        }
        [HttpDelete]
        [Route("{corpussId}")]
        [Authorize(Roles = HotelRoles.Admin)]
        public async Task<ActionResult> Delete(int hotelsId, int corpussId)
        {
            var corpuss = await _corpussRepository.GetCorpussAsync(hotelsId, corpussId);
            if (corpuss == null)
                return NotFound();
            await _corpussRepository.DeleteCorpussAsync(corpuss);
            return NoContent();
        }
    }
}
