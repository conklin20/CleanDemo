using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest 
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            /// <summary>
            /// Handler for the Create Activity command
            /// See info on AddAsync. We're not actually connecting to the database at this point, we're just using the context to add the activity to the list of activities in memory.
            /// </summary>
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // await _context.Activities.AddAsync(request.Activity);
                _context.Activities.Add(request.Activity);
                
                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}