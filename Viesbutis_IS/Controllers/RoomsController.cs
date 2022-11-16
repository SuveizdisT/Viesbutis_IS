using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Viesbutis_IS.Auth.Model;
using Viesbutis_IS.Data.Dtos;
using Viesbutis_IS.Data.Entities;
using Viesbutis_IS.Data.Repositories;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api/hotels/{hotelsId}/corpusses/{corpussId}/rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomsRepository _roomsRepository;
        public RoomsController(IRoomsRepository roomsRepository)
        {
            _roomsRepository = roomsRepository;
        }
        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<RoomDto>> GetAll(int hotelsId, int corpussId)
        {
            var rooms = await _roomsRepository.GetRoomsAsync(hotelsId, corpussId);
            return rooms.Select(r => new RoomDto(
                r.RoomId, r.Floor, r.Rating, 
                r.Capacity, r.Price, hotelsId, corpussId));
        }
        //api/hotels/{hotelsId}/corpusses/{corpussId}/rooms/{roomId}
        [HttpGet]
        [Route("{roomId}")]
        public async Task<ActionResult<RoomDto>> Get(int hotelsId, int corpussId, int roomId)
        {
            var room = await _roomsRepository.GetRoomAsync(hotelsId, corpussId, roomId);
            if (room == null)
                return NotFound();
            return new RoomDto(room.RoomId, room.Floor, 
                room.Rating, room.Capacity, room.Price, 
                hotelsId, corpussId);
        }
        [HttpPost]
        [Route("")]
        [Authorize(Roles = HotelRoles.Admin)]
        public ActionResult Create(int hotelsId, int corpussId, CreateRoomDto createRoom)
        {

            var room = new Room
            {
                RoomId = createRoom.roomId,
                Floor = createRoom.floor,
                Rating = createRoom.rating,
                Capacity = createRoom.capacity,
                Price = createRoom.price,
                Corpuss = null
            };
            var flag = _roomsRepository.CheckHotelAndCorpuss(hotelsId, corpussId);
            if (flag)
            {
                _roomsRepository.CreateRoomAsync(room, corpussId);

                return Created("", new RoomDto(room.RoomId, room.Floor,
                    room.Rating, room.Capacity, room.Price,
                    hotelsId, corpussId));
            }
            else return NoContent();
        }
        [HttpPut]
        [Route("{roomId}")]
        [Authorize(Roles = HotelRoles.Admin)]
        public async Task<ActionResult<RoomDto>> Update(int hotelsId, int corpussId, int roomId, UpdateRoomDto updateRoom)
        {
            var room = await _roomsRepository.GetRoomAsync(hotelsId, corpussId, roomId);
            if (room == null)
                return NotFound();
            room.Rating = updateRoom.rating;
            room.Capacity = updateRoom.capacity;
            room.Price = updateRoom.price;
            await _roomsRepository.UpdateRoomAsync(room);
            return Ok(new RoomDto(room.RoomId, room.Floor,
                room.Rating, room.Capacity, room.Price,
                hotelsId, corpussId));
        }
        [HttpDelete]
        [Route("{roomId}")]
        [Authorize(Roles = HotelRoles.Admin)]
        public async Task<ActionResult> Delete(int hotelsId, int corpussId, int roomId)
        {
            var room = await _roomsRepository.GetRoomAsync(hotelsId,corpussId, roomId);
            if (room == null)
                return NotFound();
            await _roomsRepository.DeleteRoomAsync(room);
            return NoContent();
        }
    }
}
