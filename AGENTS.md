# Coding Rules for Node.js Topics Project

## Minimal Logging

- Avoid excessive console.log statements
- Only log essential success/failure messages
- Do not log intermediate steps or verbose debugging output
- Let errors propagate naturally rather than logging at every level

## Self-Documenting Code

- Good code should express itself without comments
- Avoid comments that simply restate what the code does
- Use clear function and variable names to convey intent
- Code should be readable and understandable on its own

## Concise Error Messages

- Keep error messages short and actionable
- Avoid verbose multi-line error checklists
- Consolidate related errors into single, clear messages
- Focus on what the user needs to know, not implementation details

## Simplified Error Handling

- Don't wrap errors in unnecessary try-catch blocks that only re-throw
- Let errors propagate naturally unless adding meaningful error handling
- Remove redundant error handling layers
- Trust the error propagation mechanism

## Clean Code Structure

- Remove redundant code and unnecessary abstractions
- Prefer direct, straightforward implementations
- Avoid verbose patterns when simpler alternatives exist
- Keep functions focused and single-purpose

## When Writing Code

- Write code that is simple, readable, and self-explanatory
- Minimize logging to only what's necessary
- Let the code structure and naming convey meaning
- Prefer simplicity over verbosity

## Commit Message Style

- Write commit messages in a natural, human-written style
- Maximum 2 lines
- Start with lowercase verb or action (add, update, implement, handle, fix, enhance, create)
- Keep messages concise and descriptive
