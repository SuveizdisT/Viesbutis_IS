using Microsoft.AspNetCore.Mvc;
//using System.Web.Mvc;
using Viesbutis_IS.Data.Dtos;
using Viesbutis_IS.Data.Entities;
using Viesbutis_IS.Data.Repositories;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api/hotels")]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelsRepository _hotelsRepository;
        public HotelsController(IHotelsRepository hotelsRepository)
        {
            _hotelsRepository = hotelsRepository;
        }
        [HttpGet]
        //[Route("api/hotels")] // "{hotelId}"
        [Route("")]
        public async Task<IEnumerable<HotelDto>> GetAll()
        {
            var temp = await _hotelsRepository.GetHotelsAsync();
            return temp.Select(t => new HotelDto(t.Name, t.City, t.Address, t.PhoneNumber));
        }
        //api/hotels/{hotelId}
        [HttpGet]
        [Route("{hotelId:int}", Name = "GetHotel")]
        public async Task<ActionResult<HotelDto>> Get(int hotelId)
        {
            var temp = await _hotelsRepository.GetHotelAsync(hotelId);
            if (temp == null)
                return NotFound();
            return new HotelDto(temp.Name,temp.City, temp.Address, temp.PhoneNumber);
        }
        [HttpPost]
        //[Route("{hotelId}")]
        [Route("")]
        public CreatedResult Create(CreateHotelDto createHotel)
        {
            var hotel = new Hotel 
            { 
                Name = createHotel.name, 
                City = createHotel.city, 
                Address = createHotel.address, 
                PhoneNumber = createHotel.phoneNumber 
            };
            _hotelsRepository.CreateHotelAsync(hotel);

            return Created("", new HotelDto(hotel.Name, hotel.City, hotel.Address, hotel.PhoneNumber));
            /*return CreatedAtAction("GetHotel", new { hotelId = hotel.HotelId}, 
                new HotelDto(hotel.Name, hotel.City, hotel.Address, hotel.PhoneNumber));*/
        }
        [HttpPut]
        [Route("{hotelId:int}")]
        public async Task<ActionResult<HotelDto>> Update(int hotelId, UpdateHotelDto updateHotel)
        {
            var hotel = await _hotelsRepository.GetHotelAsync(hotelId);
            if (hotel == null)
                return NotFound();
            hotel.Address = updateHotel.address;
            hotel.PhoneNumber = updateHotel.phoneNumber;
            await _hotelsRepository.UpdateHotelAsync(hotel);
            return Ok(new HotelDto(hotel.Name, hotel.City, hotel.Address, hotel.PhoneNumber));
        }
        [HttpDelete]
        [Route("{hotelId}")]
        public async Task<ActionResult> Delete(int hotelId)
        {
            var hotel = await _hotelsRepository.GetHotelAsync(hotelId);
            if (hotel == null)
                return NotFound();
            await _hotelsRepository.DeleteHotelAsync(hotel);
            return NoContent();
        }

    }
}
