using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Create
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            /// <summary>
            /// Handler for the Create Activity command
            /// See info on AddAsync. We're not actually connecting to the database at this point, we're just using the context to add the activity to the list of activities in memory.
            /// </summary>
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // await _context.Activities.AddAsync(request.Activity);
                _context.Activities.Add(request.Activity);
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to create activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}