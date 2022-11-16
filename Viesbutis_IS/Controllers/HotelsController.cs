using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Viesbutis_IS.Auth.Model;
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
        private readonly IAuthorizationService _authorizationService;
        public HotelsController(IHotelsRepository hotelsRepository, IAuthorizationService authorizationService)
        {
            _hotelsRepository = hotelsRepository;
            _authorizationService = authorizationService;
        }
        [HttpGet]
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
        [Route("")]
        [Authorize(Roles = HotelRoles.Admin)]
        public CreatedResult Create(CreateHotelDto createHotel)
        {
            var hotel = new Hotel
            {
                Name = createHotel.name,
                City = createHotel.city,
                Address = createHotel.address,
                PhoneNumber = createHotel.phoneNumber,
                UserID = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };
            _hotelsRepository.CreateHotelAsync(hotel);

            return Created("", new HotelDto(hotel.Name, hotel.City, hotel.Address, hotel.PhoneNumber));
        }
        [HttpPut]
        [Route("{hotelId:int}")]
        [Authorize(Roles = HotelRoles.Admin)]
        public async Task<ActionResult<HotelDto>> Update(int hotelId, UpdateHotelDto updateHotel)
        {
            var hotel = await _hotelsRepository.GetHotelAsync(hotelId);
            if (hotel == null)
                return NotFound();

            var authResult = await _authorizationService.AuthorizeAsync(User, hotel, Policies.ResourceOwner);
            if (!authResult.Succeeded)
                return Forbid();
            hotel.Address = updateHotel.address;
            hotel.PhoneNumber = updateHotel.phoneNumber;
            await _hotelsRepository.UpdateHotelAsync(hotel);
            return Ok(new HotelDto(hotel.Name, hotel.City, hotel.Address, hotel.PhoneNumber));
        }
        [HttpDelete]
        [Route("{hotelId}")]
        [Authorize(Roles = HotelRoles.Admin)]
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
