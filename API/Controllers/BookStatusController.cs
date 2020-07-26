using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Repo;
using Application.Result;
using Application.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookStatusController : ControllerBase
    {
        private readonly IBookStatus _bookStatus;

        public BookStatusController(IBookStatus bookStatus)
        {
            _bookStatus = bookStatus;
        }

        [HttpPost]
        public async Task<ActionResult> MakeABookRequest(BookStatusViewModel statusViewModel)
        {
            await _bookStatus.MakeABookRequest(statusViewModel);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> ApproveRejectRequest(RequestRejectViewModel reqRejViewModel)
        {
            await _bookStatus.ApproveRejectRequest(reqRejViewModel);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> BookSubmittedByUser(int id)
        {
            await _bookStatus.BookReturnedByUser(id);
            return Ok(); 
        }

        [HttpGet]
        public async Task<ActionResult> BookHistory()
        {
            var result = await _bookStatus.GetBookRecords();
            return Ok(result);
        }
    }
}