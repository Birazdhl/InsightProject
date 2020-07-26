using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [AllowAnonymous]

        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]

        [HttpPost("register")]
        public async Task<ActionResult<UserViewModel>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<UserViewModel>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}