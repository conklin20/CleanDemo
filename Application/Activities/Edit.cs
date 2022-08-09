using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            
            /// <summary>
            /// Handler for the Edit Activity command
            /// See info on UpdateAsync. We're not actually connecting to the database at this point, we're just using the context to update the activity in the list of activities in memory.
            /// </summary>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // find the activity in the database
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // then update the activity in our context (in memory)
                // map the activity from the request to the activity in the context
                _mapper.Map(request.Activity, activity);

                // save the changes to the database               
                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}