using Microsoft.AspNetCore.Mvc;
using Viesbutis_IS.Data.Dtos;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsController : ControllerBase
    {
        [HttpGet]
        public void GetAll()
        {

        }
        //api/rooms/{roomId}
        [HttpGet]
        [Route("{roomId}")]
        public void Get(int roomId)
        {

        }
        [HttpPost]
        public void Create(CreateRoomDto createRoom)
        {

        }
        [HttpPut]
        [Route("{roomId}")]
        public void Update(int roomId, UpdateRoomDto updateRoom)
        {

        }
        [HttpDelete]
        [Route("{roomId}")]
        public void Delete(int roomId)
        {

        }
    }
}
