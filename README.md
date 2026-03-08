# Chrono - AI-Powered Commit Message Generator

A personal project by a college student: An AI-powered command-line tool that generates professional, conventional commit messages using Google Gemini AI. It analyzes your staged git changes and suggests appropriate commit messages.

**Note:** This is a personal/educational project. You'll need to clone the repository and provide your own free Gemini API key to use it.

## Features

- AI-generated commit messages using Google Gemini
- Conventional Commits format compliance
- Optional Jira ticket prefix integration
- Interactive editing and regeneration
- Simple command-line interface

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- Git 2.0.0 or higher
- A free Google Gemini API key (no credit card required)

### Setup Instructions

1. **Clone this repository:**
   ```bash
   git clone https://github.com/Kubrooo/chrono-cli.git
   cd chrono-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get your free Gemini API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key" (completely free, no credit card needed)
   - Copy your API key

4. **Create a `.env` file in the project root:**
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env
   ```
   
   Or manually create `.env` file:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

6. **Link globally (optional):**
   ```bash
   npm link
   ```
   
   Now you can use `chrono` from anywhere!

### Alternative: Run Without Global Install

You can run it directly without linking:

```bash
# From the project directory
npm start

# Or for development
npm run dev
```

## Usage

### Basic Commands

```bash
chrono              # Generate commit message for staged changes
chrono --setup      # Configure preferences (Jira prefix)
chrono --help       # Show help information
chrono --version    # Show version number
```

### Workflow

1. Make changes to your code
2. Stage changes with `git add`
3. Run `chrono`
4. Choose an action:
   - Use the suggested message and commit immediately
   - Edit the message before committing
   - Regenerate for a different suggestion
   - Cancel the operation

### Example

```bash
$ git add src/auth.js
$ chrono

Suggested message: "feat(auth): add JWT token validation"

What would you like to do?
  > Use as is (Commit immediately)
    Edit message
    Regenerate
    Cancel
```

## Configuration

### Jira Integration

Configure a Jira project prefix to automatically include ticket references:

```bash
chrono --setup
# Enter: PROJ
```

This prefixes all commit messages with `[PROJ-X]`:

```
[PROJ-X] feat(auth): add JWT token validation
```

To remove the prefix, run `chrono --setup` and leave the field empty.

## Commit Message Format

Chrono generates messages following the Conventional Commits specification:

```
type(scope): description
```

### Common Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions or updates
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add JWT token validation
fix(api): resolve null pointer exception in user service
docs(readme): update installation instructions
refactor(utils): simplify date formatting logic
test(auth): add unit tests for login flow
```

## Why Clone Instead of npm install?

This is a personal college project, and I'm using the free tier of Google Gemini API. Each user needs their own free API key because:

- The free tier is generous (15 requests/min, 1,500 requests/day)
- No credit card required
- Takes less than 2 minutes to set up
- Keeps your usage separate and under your control

## Requirements

- Node.js 18.0.0 or higher
- Git 2.0.0 or higher
- Google Gemini API key
- Active internet connection

## About This Project

This is a personal project created by a college student to learn about:
- TypeScript and Node.js development
- AI API integration (Google Gemini)
- CLI tool development
- Git automation
- Open source project structure

Feel free to fork, modify, and learn from it!

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Installation Guide](docs/installation.md) - Detailed installation instructions and troubleshooting
- [Usage Guide](docs/usage.md) - Complete usage documentation and examples
- [Configuration Guide](docs/configuration.md) - Configuration options and environment setup
- [API Reference](docs/api-reference.md) - Technical API documentation for developers
- [Contributing Guide](docs/contributing.md) - Guidelines for contributing to the project
- [Troubleshooting Guide](docs/troubleshooting.md) - Solutions to common issues

## Development

Want to modify or extend Chrono?

### Development Workflow

```bash
# Already cloned and installed? Start here:

# Make your changes in src/

# Test in development mode (no build needed)
npm run dev

# Build for production
npm run build

# Test the built version
npm start
```

### Project Structure

```
chrono-cli/
├── src/
│   ├── core/           # Core functionality
│   ├── utils/          # Utility functions
│   └── index.ts        # Main entry point
├── dist/               # Compiled output
├── docs/               # Documentation
└── package.json        # Project configuration
```

## Contributing

Contributions are welcome. Please read the [Contributing Guide](docs/contributing.md) for details on:

- Code of conduct
- Development setup
- Coding standards
- Pull request process
- Testing guidelines

## Troubleshooting

Common issues and solutions:

- **Command not found**: Ensure npm global bin directory is in your PATH
- **API key not detected**: Verify `.env` file exists in project root
- **No staged changes**: Run `git add` before using chrono
- **Not a git repository**: Initialize git with `git init`

For detailed troubleshooting, see the [Troubleshooting Guide](docs/troubleshooting.md).

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with:

- [@clack/prompts](https://github.com/natemoo-re/clack) - Interactive CLI prompts
- [Google Generative AI](https://ai.google.dev/) - AI-powered message generation
- [execa](https://github.com/sindresorhus/execa) - Process execution
- [conf](https://github.com/sindresorhus/conf) - Configuration management
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management

## Support

This is a personal college project, but feel free to:

- Report bugs: [GitHub Issues](https://github.com/Kubrooo/chrono-cli/issues)
- Suggest features: [GitHub Issues](https://github.com/Kubrooo/chrono-cli/issues)
- Fork and modify for your own use
- Learn from the code

## Author

Created by a college student as a learning project.

If you find this useful, consider giving it a star on GitHub!

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.
