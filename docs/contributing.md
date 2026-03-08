# Contributing Guide

## Introduction

Thank you for considering contributing to Chrono. This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

### Our Standards

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git 2.0.0 or higher
- A Google Gemini API key for testing
- Familiarity with TypeScript
- Understanding of git workflows

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/chrono-cli.git
   cd chrono-cli
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/Kubrooo/chrono-cli.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create a `.env` file:
   ```bash
   echo "GEMINI_API_KEY=your_key_here" > .env
   ```

6. Build the project:
   ```bash
   npm run build
   ```

7. Test the build:
   ```bash
   npm start
   ```

### Development Workflow

1. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src` directory

3. Test your changes:
   ```bash
   npm run dev
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Test the built version:
   ```bash
   npm start
   ```

6. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

8. Create a Pull Request on GitHub

## Project Structure

```
chrono-cli/
├── src/
│   ├── core/
│   │   ├── ai.ts           # AI integration logic
│   │   ├── config.ts       # Configuration management
│   │   └── git.ts          # Git operations
│   ├── utils/
│   │   └── error-handler.ts # Error handling utilities
│   └── index.ts            # Main entry point
├── dist/                   # Compiled JavaScript (generated)
├── docs/                   # Documentation
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata
├── tsconfig.json           # TypeScript configuration
├── README.md               # Project overview
├── LICENSE                 # License information
└── CHANGELOG.md            # Version history
```

## Coding Standards

### TypeScript Guidelines

1. Use TypeScript strict mode
2. Provide explicit type annotations for function parameters and return types
3. Avoid using `any` type unless absolutely necessary
4. Use interfaces for object shapes
5. Use enums for fixed sets of values

**Example:**
```typescript
interface CommitOptions {
  message: string;
  jiraPrefix?: string;
}

async function commitChanges(options: CommitOptions): Promise<void> {
  // Implementation
}
```

### Code Style

1. Use 2 spaces for indentation
2. Use single quotes for strings
3. Add semicolons at the end of statements
4. Use camelCase for variables and functions
5. Use PascalCase for classes and interfaces
6. Use UPPER_CASE for constants

**Example:**
```typescript
const MAX_RETRIES = 3;

class CommitGenerator {
  private apiKey: string;

  async generateMessage(diff: string): Promise<string> {
    // Implementation
  }
}
```

### File Organization

1. Group imports by category (external, internal, types)
2. Place interfaces and types at the top of files
3. Export functions and classes explicitly
4. Keep files focused on a single responsibility

**Example:**
```typescript
// External imports
import { execa } from 'execa';
import dotenv from 'dotenv';

// Internal imports
import { getPreferences } from './config';
import { handleError } from '../utils/error-handler';

// Types
interface GitDiff {
  files: string[];
  changes: string;
}

// Implementation
export async function getStagedDiff(): Promise<string> {
  // Implementation
}
```

### Comments

1. Use comments to explain "why", not "what"
2. Keep comments concise and relevant
3. Update comments when code changes
4. Use JSDoc for public APIs

**Example:**
```typescript
/**
 * Generates a commit message from staged git changes.
 * 
 * @param diff - The git diff output from staged changes
 * @returns A conventional commit message
 * @throws Error if API key is not configured
 */
export async function generateCommitMessage(diff: string): Promise<string> {
  // Validate API key early to provide clear error message
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not found');
  }
  
  // Implementation
}
```

### Error Handling

1. Use specific error types when possible
2. Provide helpful error messages
3. Include context in error messages
4. Handle errors at appropriate levels

**Example:**
```typescript
export async function checkIsGitRepo(): Promise<void> {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree']);
  } catch (error) {
    throw new Error(
      'Not a git repository. Run "git init" to initialize a git repository.'
    );
  }
}
```

## Testing

### Manual Testing

Before submitting a pull request, test the following scenarios:

1. **Basic functionality:**
   - Generate commit message for simple changes
   - Edit generated message
   - Regenerate message
   - Cancel commit

2. **Configuration:**
   - Run setup command
   - Set Jira prefix
   - Remove Jira prefix
   - Verify persistence

3. **Error handling:**
   - Run outside git repository
   - Run without staged changes
   - Run without API key
   - Test with invalid API key

4. **Edge cases:**
   - Large diffs (many files)
   - Binary file changes
   - Empty commits
   - Special characters in messages

### Testing Checklist

- [ ] Code builds without errors
- [ ] All existing functionality still works
- [ ] New features work as expected
- [ ] Error messages are clear and helpful
- [ ] Configuration persists correctly
- [ ] Help and version flags work
- [ ] Works on different operating systems (if possible)

## Commit Message Guidelines

Follow the Conventional Commits specification:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```
feat(ai): add support for custom prompts
fix(config): resolve issue with empty Jira prefix
docs(readme): update installation instructions
refactor(git): simplify diff parsing logic
test(ai): add unit tests for message generation
chore(deps): update dependencies to latest versions
```

### Best Practices

1. Use imperative mood ("add" not "added")
2. Keep the first line under 72 characters
3. Capitalize the first letter of the description
4. Do not end the description with a period
5. Provide context in the body for complex changes

## Pull Request Process

### Before Submitting

1. Ensure your code follows the coding standards
2. Test your changes thoroughly
3. Update documentation if needed
4. Add entries to CHANGELOG.md
5. Rebase on the latest upstream main branch

### Pull Request Template

When creating a pull request, include:

**Title:**
```
feat(scope): brief description of changes
```

**Description:**
```
## Description
Brief overview of what this PR does

## Motivation
Why is this change needed?

## Changes
- List of specific changes made
- Another change
- Yet another change

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] CHANGELOG.md updated
```

### Review Process

1. Maintainers will review your pull request
2. Address any requested changes
3. Push updates to the same branch
4. Request re-review when ready
5. Once approved, maintainers will merge

### After Merge

1. Delete your feature branch
2. Pull the latest changes from upstream
3. Update your fork

## Types of Contributions

### Bug Reports

When reporting bugs, include:

- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Error messages or logs
- Screenshots if applicable

**Template:**
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows 10
- Node.js: v18.0.0
- Chrono version: 1.0.0

## Additional Context
Any other relevant information
```

### Feature Requests

When requesting features, include:

- Clear, descriptive title
- Problem statement
- Proposed solution
- Alternative solutions considered
- Use cases
- Potential impact

**Template:**
```markdown
## Feature Description
Brief description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
What other approaches were considered?

## Use Cases
- Use case 1
- Use case 2

## Additional Context
Any other relevant information
```

### Documentation Improvements

Documentation contributions are highly valued:

- Fix typos or grammatical errors
- Clarify confusing sections
- Add missing information
- Improve examples
- Translate documentation

### Code Contributions

Areas where contributions are welcome:

- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test coverage
- Error handling improvements

## Development Tips

### Debugging

Use the development script for faster iteration:

```bash
npm run dev
```

This uses `tsx` to run TypeScript directly without building.

### Testing with Different Scenarios

Create test repositories with various scenarios:

```bash
mkdir test-repo
cd test-repo
git init
echo "test" > file.txt
git add file.txt
chrono
```

### Inspecting Configuration

Check stored configuration:

**Linux/macOS:**
```bash
cat ~/.config/chrono-cli/config.json
```

**Windows:**
```bash
type %APPDATA%\chrono-cli\config.json
```

### API Testing

Test API integration separately:

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const result = await model.generateContent("test prompt");
console.log(result.response.text());
```

## Release Process

For maintainers:

1. Update version in `package.json`
2. Update `CHANGELOG.md` with release notes
3. Update version constant in `src/index.ts`
4. Commit changes: `git commit -m "chore: release v1.x.x"`
5. Create git tag: `git tag v1.x.x`
6. Push changes: `git push && git push --tags`
7. Build: `npm run build`
8. Publish: `npm publish`
9. Create GitHub release with changelog

## Getting Help

If you need help:

- Check existing documentation
- Search existing issues
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be recognized in:

- CHANGELOG.md for their contributions
- GitHub contributors page
- Release notes

Thank you for contributing to Chrono.
