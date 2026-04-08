# Usage Guide

## Basic Workflow

The typical workflow for using chrono consists of four steps:

1. Make changes to your code
2. Stage the changes with git
3. Run chrono to generate a commit message
4. Review and commit

## Command Reference

### Generate Commit Message

```bash
chrono
```

This is the primary command. It analyzes your staged changes and generates an appropriate commit message using AI.

**Prerequisites:**
- Must be run inside a git repository
- Must have staged changes (via `git add`)
- Must have GEMINI_API_KEY configured in `.env`

**Process:**
1. Chrono reads the staged git diff
2. Sends the diff to Google Gemini AI
3. Receives and displays a suggested commit message
4. Presents options for next steps

### Non-Interactive Modes

```bash
chrono --yes
chrono --dry-run
chrono --message "feat: update auth flow"
```

These flags are useful when you want chrono to run without prompts.

**`--yes`**

- Generates a commit message with AI
- Skips the action prompt
- Commits immediately with the suggested message

**`--dry-run`**

- Generates a commit message with AI
- Prints the suggestion to the terminal
- Does not create a commit

**`--message`**

- Uses the message you provide directly
- Skips AI generation entirely
- Commits immediately unless `--dry-run` is also provided

### Configure Preferences

```bash
chrono --setup
```

Opens an interactive configuration wizard to set preferences.

**Current Configuration Options:**
- Jira Project Key: Prefix for Jira ticket integration

**Example:**
```bash
$ chrono --setup
Enter your Jira Project Key (leave empty to skip): PROJ
Preferences saved successfully!
```

To remove a configuration, run setup again and leave the field empty.

### Display Help

```bash
chrono --help
chrono -h
```

Displays usage information, available commands, and examples.

### Show Version

```bash
chrono --version
chrono -v
```

Displays the currently installed version of chrono.

## Interactive Options

After chrono generates a commit message, you are presented with four options:

### 1. Use as is (Commit immediately)

Accepts the suggested message and commits immediately.

**What happens:**
- Executes `git commit -m "suggested message"`
- Displays success confirmation
- Exits

**When to use:**
- The suggested message accurately describes your changes
- You want to commit quickly without modifications

### 2. Edit message

Opens a text input to modify the suggested message before committing.

**What happens:**
- Displays the suggested message as editable text
- Allows you to modify any part of the message
- Commits with your edited version

**When to use:**
- The suggestion is mostly correct but needs minor adjustments
- You want to add additional context
- You need to correct specific details

### 3. Regenerate

Requests a new commit message suggestion from the AI.

**What happens:**
- Sends the same diff to the AI again
- Generates a different commit message
- Presents the new suggestion with the same options

**When to use:**
- The first suggestion is not appropriate
- You want to see alternative phrasings
- The message is too generic or too specific

**Note:** Each regeneration makes a new API call and may produce different results.

### 4. Cancel

Aborts the commit process without making any changes.

**What happens:**
- Exits chrono without committing
- Your staged changes remain staged
- No commit is created

**When to use:**
- You realize you need to make additional changes
- The suggestions are not satisfactory
- You want to commit manually instead

## Commit Message Format

Chrono generates commit messages following the Conventional Commits specification.

### Standard Format

```
type(scope): brief description
```

**Components:**

- **type**: The kind of change (feat, fix, docs, style, refactor, test, chore)
- **scope**: The area of the codebase affected (optional)
- **description**: A concise summary of the change

### Common Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD configuration changes
- `build`: Build system or external dependency changes

### Examples

```
feat(auth): add JWT token validation
fix(api): resolve null pointer exception in user service
docs(readme): update installation instructions
refactor(utils): simplify date formatting logic
test(auth): add unit tests for login flow
chore(deps): update dependencies to latest versions
```

### With Jira Integration

When Jira prefix is configured:

```
[PROJ-X] feat(auth): add JWT token validation
[PROJ-X] fix(api): resolve null pointer exception
```

The `X` is a placeholder indicating where the ticket number should be inserted.

## Advanced Usage

### Working with Large Changes

For commits with extensive changes:

1. Consider breaking changes into smaller, logical commits
2. Stage related changes together: `git add file1.js file2.js`
3. Run chrono for each logical group
4. This produces more focused, meaningful commit messages

### Handling Multiple Files

Chrono analyzes all staged changes together:

```bash
# Stage multiple files
git add src/auth.js src/user.js tests/auth.test.js

# Generate message for all changes
chrono
```

The AI considers the context of all changes to generate an appropriate message.

### Partial Staging

Use git's partial staging to commit specific changes:

```bash
# Stage specific lines interactively
git add -p

# Generate message for staged portions
chrono
```

### Integration with Git Hooks

You can integrate chrono into git hooks for automated workflows.

**Example pre-commit hook:**

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run linting
npm run lint

# Check if there are staged changes
if git diff --cached --quiet; then
  echo "No staged changes"
  exit 1
fi
```

**Note:** Chrono is interactive and not suitable for automated commit hooks. Use it manually for best results.

### Using with Git Aliases

Create git aliases for common workflows:

```bash
# Add to ~/.gitconfig
[alias]
  ac = !git add -A && chrono
  acp = !git add -A && chrono && git push
```

Usage:
```bash
git ac   # Stage all and run chrono
git acp  # Stage all, commit with chrono, and push
```

## Best Practices

### 1. Review Generated Messages

Always review AI-generated messages before committing. The AI is helpful but not perfect.

### 2. Stage Related Changes Together

Group related changes in a single commit for coherent messages.

### 3. Use Descriptive Scopes

When editing messages, ensure scopes accurately reflect the affected area.

### 4. Keep Commits Atomic

Each commit should represent a single logical change.

### 5. Regenerate if Needed

Don't settle for a poor message. Use the regenerate option to get better suggestions.

### 6. Edit for Clarity

If the AI message is close but not quite right, use the edit option to refine it.

### 7. Maintain Consistency

If your team has commit message conventions, edit AI suggestions to match them.

## Common Scenarios

### Scenario 1: Simple Bug Fix

```bash
# Fix the bug
vim src/calculator.js

# Stage the fix
git add src/calculator.js

# Generate message
chrono
# Suggestion: "fix(calculator): correct division by zero error"

# Commit with suggestion
# Select: Use as is
```

### Scenario 2: New Feature with Tests

```bash
# Implement feature and tests
git add src/feature.js tests/feature.test.js

# Generate message
chrono
# Suggestion: "feat(feature): implement user authentication with tests"

# Commit
# Select: Use as is
```

### Scenario 3: Documentation Update

```bash
# Update docs
git add README.md docs/api.md

# Generate message
chrono
# Suggestion: "docs: update API documentation and README"

# Commit
# Select: Use as is
```

### Scenario 4: Refactoring

```bash
# Refactor code
git add src/utils/*.js

# Generate message
chrono
# Suggestion: "refactor(utils): extract common validation logic"

# Edit to add detail
# Select: Edit message
# Modified: "refactor(utils): extract common validation logic into validators module"
```

## Troubleshooting

### No Staged Changes Error

**Error:** "No changes are staged. Run 'git add <files>' first to stage your changes."

**Solution:** Stage your changes before running chrono:
```bash
git add .
# or
git add specific-file.js
```

### Not a Git Repository Error

**Error:** "Not a git repository. Run 'git init' to initialize a git repository."

**Solution:** Initialize a git repository or navigate to an existing one:
```bash
git init
```

### API Key Not Found Error

**Error:** "GEMINI_API_KEY not found. Please set it in your .env file."

**Solution:** Create a `.env` file with your API key:
```bash
echo "GEMINI_API_KEY=your_key_here" > .env
```

### Poor Quality Suggestions

If suggestions are consistently poor:

1. Ensure your changes are staged correctly
2. Try regenerating for alternative suggestions
3. Use the edit option to refine the message
4. Consider if your changes are too large or unfocused
5. Break large changes into smaller, logical commits

### API Rate Limiting

If you encounter rate limiting:

1. Wait a few moments before trying again
2. Check your Gemini API quota at Google AI Studio
3. Consider upgrading your API plan if needed
4. Reduce the frequency of regeneration requests
