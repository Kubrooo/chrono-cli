# API Reference

## Overview

This document provides technical reference for Chrono's internal APIs and modules. This is primarily useful for contributors and developers extending Chrono.

## Module Structure

### Core Modules

- `core/ai.ts` - AI integration and message generation
- `core/config.ts` - Configuration management
- `core/git.ts` - Git operations
- `utils/error-handler.ts` - Error handling utilities
- `index.ts` - Main entry point and CLI interface

## core/ai.ts

### generateCommitMessage

Generates a commit message from git diff using Google Gemini AI.

**Signature:**
```typescript
async function generateCommitMessage(diff: string): Promise<string>
```

**Parameters:**
- `diff` (string): The git diff output from staged changes

**Returns:**
- Promise<string>: A conventional commit message

**Throws:**
- Error: If GEMINI_API_KEY is not configured
- Error: If API request fails
- Error: If response is invalid

**Example:**
```typescript
import { generateCommitMessage } from './core/ai';

const diff = await getStagedDiff();
const message = await generateCommitMessage(diff);
console.log(message); // "feat(auth): add JWT validation"
```

**Implementation Details:**

1. Validates GEMINI_API_KEY environment variable
2. Retrieves user preferences (Jira prefix)
3. Constructs prompt with diff and preferences
4. Sends request to Gemini API
5. Processes and cleans response
6. Returns formatted commit message

**AI Model:**
- Model: `gemini-2.5-flash`
- Provider: Google Generative AI
- Characteristics: Fast, cost-effective, suitable for short text generation

**Prompt Structure:**

The function constructs a prompt that includes:
- Instructions to analyze the git diff
- Request for conventional commit format
- Jira prefix requirement (if configured)
- Length constraints (under 72 characters)
- Instruction to avoid markdown formatting

**Response Processing:**

The function cleans the AI response by:
- Trimming whitespace
- Removing markdown code blocks
- Ensuring single-line format

## core/config.ts

### getPreferences

Retrieves user preferences from persistent storage.

**Signature:**
```typescript
function getPreferences(): {
  jiraPrefix: string;
  commitStyle: string;
}
```

**Parameters:**
None

**Returns:**
- Object with preferences:
  - `jiraPrefix` (string): Jira project key or empty string
  - `commitStyle` (string): Commit message style (currently only "conventional")

**Example:**
```typescript
import { getPreferences } from './core/config';

const prefs = getPreferences();
console.log(prefs.jiraPrefix); // "PROJ" or ""
console.log(prefs.commitStyle); // "conventional"
```

**Storage Location:**

Preferences are stored using the `conf` package in platform-specific directories:
- Linux: `~/.config/chrono-cli/config.json`
- macOS: `~/Library/Preferences/chrono-cli/config.json`
- Windows: `%APPDATA%\chrono-cli\config.json`

**Default Values:**
- `jiraPrefix`: "" (empty string)
- `commitStyle`: "conventional"

### setPreference

Sets a user preference value.

**Signature:**
```typescript
function setPreference(key: string, value: any): void
```

**Parameters:**
- `key` (string): The preference key to set
- `value` (any): The value to set (empty string/null/undefined deletes the key)

**Returns:**
None

**Throws:**
- Error: If unable to write to configuration storage

**Example:**
```typescript
import { setPreference } from './core/config';

// Set a value
setPreference('jiraPrefix', 'PROJ');

// Remove a value
setPreference('jiraPrefix', '');
```

**Special Behavior:**

If value is empty string, null, or undefined, the key is deleted from storage rather than set to an empty value. This is required by the `conf` package.

**Available Keys:**
- `jiraPrefix`: Jira project key
- `commitStyle`: Commit message style (future use)

## core/git.ts

### checkIsGitRepo

Verifies that the current directory is inside a git repository.

**Signature:**
```typescript
async function checkIsGitRepo(): Promise<void>
```

**Parameters:**
None

**Returns:**
- Promise<void>: Resolves if in a git repository

**Throws:**
- Error: If not in a git repository

**Example:**
```typescript
import { checkIsGitRepo } from './core/git';

try {
  await checkIsGitRepo();
  console.log('In a git repository');
} catch (error) {
  console.error('Not in a git repository');
}
```

**Implementation:**

Executes `git rev-parse --is-inside-work-tree` to check repository status.

### getStagedDiff

Retrieves the diff of staged changes.

**Signature:**
```typescript
async function getStagedDiff(): Promise<string>
```

**Parameters:**
None

**Returns:**
- Promise<string>: The git diff output

**Throws:**
- Error: If no changes are staged

**Example:**
```typescript
import { getStagedDiff } from './core/git';

const diff = await getStagedDiff();
console.log(diff);
// Output: diff --git a/file.js b/file.js
//         index 1234567..abcdefg 100644
//         --- a/file.js
//         +++ b/file.js
//         @@ -1,3 +1,4 @@
//         +new line
```

**Implementation:**

Executes `git diff --cached` to retrieve staged changes.

**Diff Format:**

Returns the standard git diff format including:
- File paths
- Change markers (+++, ---)
- Line numbers
- Added lines (prefixed with +)
- Removed lines (prefixed with -)
- Context lines

### exectCommit

Executes a git commit with the provided message.

**Signature:**
```typescript
async function exectCommit(message: string): Promise<void>
```

**Parameters:**
- `message` (string): The commit message

**Returns:**
- Promise<void>: Resolves when commit is successful

**Throws:**
- Error: If commit fails

**Example:**
```typescript
import { exectCommit } from './core/git';

await exectCommit('feat(auth): add JWT validation');
console.log('Commit successful');
```

**Implementation:**

Executes `git commit -m "message"` to create the commit.

**Note:**

The function name has a typo (`exect` instead of `exec`). This is maintained for backward compatibility but may be corrected in a future major version.

## utils/error-handler.ts

### handleError

Centralized error handling for the application.

**Signature:**
```typescript
function handleError(error: unknown): void
```

**Parameters:**
- `error` (unknown): The error to handle

**Returns:**
None (exits process)

**Example:**
```typescript
import { handleError } from './utils/error-handler';

try {
  await someOperation();
} catch (error) {
  handleError(error);
}
```

**Behavior:**

1. Extracts error message from various error types
2. Displays formatted error message to user
3. Exits process with code 1

**Error Types Handled:**
- Error objects (standard JavaScript errors)
- String errors
- Unknown error types

**Output Format:**

Displays errors using the `@clack/prompts` outro function with red color formatting.

## index.ts

### main

Main entry point for the CLI application.

**Signature:**
```typescript
async function main(): Promise<void>
```

**Parameters:**
None

**Returns:**
- Promise<void>

**Behavior:**

1. Parses command-line arguments
2. Handles flags (--help, --version, --setup)
3. Executes main workflow:
   - Check git repository
   - Get staged diff
   - Generate commit message
   - Present interactive options
   - Execute commit

**Command-Line Arguments:**

- `--help`, `-h`: Display help information
- `--version`, `-v`: Display version number
- `--setup`: Run configuration wizard

**Interactive Flow:**

1. Display intro banner
2. Show spinner while processing
3. Display generated message
4. Present options:
   - Use as is (commit immediately)
   - Edit message
   - Regenerate
   - Cancel
5. Execute selected action
6. Display outro message

**Error Handling:**

All errors are caught and passed to `handleError` for consistent error display.

## Environment Variables

### GEMINI_API_KEY

**Type:** string

**Required:** Yes

**Description:** Google Gemini API key for AI message generation

**Format:** Alphanumeric string provided by Google AI Studio

**Example:**
```env
# This is a fake example key for documentation purposes
GEMINI_API_KEY=your_api_key_here
```

**Validation:**

Checked at runtime before making API calls. If missing, a descriptive error is thrown.

## Configuration Schema

### Stored Configuration

**Location:** Platform-specific config directory

**Format:** JSON

**Schema:**
```typescript
interface Config {
  jiraPrefix?: string;
  commitStyle?: string;
}
```

**Example:**
```json
{
  "jiraPrefix": "PROJ",
  "commitStyle": "conventional"
}
```

## Constants

### VERSION

**Type:** string

**Value:** "1.0.0"

**Location:** `src/index.ts`

**Usage:** Displayed by `--version` flag

**Update:** Must be manually updated for each release

## Dependencies

### External Dependencies

#### @clack/prompts

**Purpose:** Interactive CLI prompts and UI

**Functions Used:**
- `intro()`: Display intro banner
- `outro()`: Display outro message
- `spinner()`: Show loading spinner
- `select()`: Present multiple choice options
- `text()`: Get text input
- `isCancel()`: Check if user cancelled

#### @google/generative-ai

**Purpose:** Google Gemini AI integration

**Classes Used:**
- `GoogleGenerativeAI`: Main API client

**Methods Used:**
- `getGenerativeModel()`: Get model instance
- `generateContent()`: Generate text from prompt

#### conf

**Purpose:** Persistent configuration storage

**Methods Used:**
- `get()`: Retrieve configuration value
- `set()`: Store configuration value
- `delete()`: Remove configuration value

#### dotenv

**Purpose:** Load environment variables from .env file

**Usage:**
```typescript
import dotenv from 'dotenv';
dotenv.config();
```

#### execa

**Purpose:** Execute shell commands

**Usage:**
```typescript
import { execa } from 'execa';
await execa('git', ['diff', '--cached']);
```

#### picocolors

**Purpose:** Terminal color formatting

**Functions Used:**
- `cyan()`: Cyan text
- `green()`: Green text
- `yellow()`: Yellow text
- `red()`: Red text
- `dim()`: Dimmed text
- `bold()`: Bold text
- `bgCyan()`: Cyan background
- `bgGreen()`: Green background
- `bgMagenta()`: Magenta background
- `black()`: Black text

## Type Definitions

### Implicit Types

While Chrono doesn't export explicit type definitions, the following types are used internally:

```typescript
// Preferences object
interface Preferences {
  jiraPrefix: string;
  commitStyle: string;
}

// Select option
interface SelectOption {
  value: string;
  label: string;
  hint?: string;
}

// Command-line arguments
type Args = string[];
```

## Error Messages

### Standard Error Messages

**Not a git repository:**
```
Not a git repository. Run "git init" to initialize a git repository.
```

**No staged changes:**
```
No changes are staged. Run "git add <files>" first to stage your changes.
```

**API key not found:**
```
GEMINI_API_KEY not found. Please set it in your .env file.
Get your API key from: https://aistudio.google.com/app/apikey
```

**Commit failed:**
```
Failed to commit. Check your git status again.
```

## Exit Codes

- `0`: Success
- `1`: Error occurred

## Future API Considerations

Planned additions for future versions:

- Custom prompt templates
- Multiple AI provider support
- Programmatic API for integration
- Plugin system
- Custom commit types
- Multi-line message support
- Commit message validation

## Versioning

Chrono follows Semantic Versioning (SemVer):

- MAJOR: Breaking API changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

Current version: 1.0.0
