using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // private means that this field is not available outside of this class
        private IMediator _mediator;
        // protected means that it can be used in the derived class (our controllers)
        // ??= means that if the _mediator is null, we will create a new one
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        // method for handling requests
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            if (result.IsSuccess && result.Value == null) return NotFound();
            return BadRequest(result.Error);
        }
    }
}