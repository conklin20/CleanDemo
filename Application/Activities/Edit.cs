using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        // Command Validator
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // find the activity in the database
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null) return null;

                // then update the activity in our context (in memory)
                // map the activity from the request to the activity in the context
                _mapper.Map(request.Activity, activity);

                // save the changes to the database               
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to edit activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}