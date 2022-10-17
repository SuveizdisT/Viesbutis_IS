using Microsoft.AspNetCore.Mvc;
using Viesbutis_IS.Data.Dtos;

namespace Viesbutis_IS.Controllers
{
    [ApiController]
    [Route("api/corpusses")]
    public class CorpussController : ControllerBase
    {
        [HttpGet]
        public void GetAll()
        {

        }
        //api/corpusses/{corpussId}
        [HttpGet]
        [Route("{corpussId}")]
        public void Get(int corpussId)
        {

        }
        [HttpPost]
        public void Create(CreateCorpussDto createCorpuss)
        {

        }
        [HttpPut]
        [Route("{corpussId}")]
        public void Update(int corpussId, UpdateCorpussDto updateCorpuss)
        {

        }
        [HttpDelete]
        [Route("{corpussId}")]
        public void Delete(int corpussId)
        {

        }
    }
}
