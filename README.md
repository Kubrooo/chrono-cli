# 🚀 Chrono - AI-Powered Commit Message Generator

Generate professional, conventional commit messages using AI. Never struggle with commit messages again!

## ✨ Features

- 🤖 AI-generated commit messages using Google Gemini
- 📝 Conventional commits format
- 🎯 Optional Jira ticket prefix support
- ✏️ Edit or regenerate suggestions
- 🎨 Beautiful CLI interface

## 📦 Installation

```bash
npm install -g chrono-eis-versiegelung
```

Or use locally in your project:

```bash
npm install --save-dev chrono-eis-versiegelung
```

## 🔧 Setup

1. **Get your Gemini API key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key

2. **Create a `.env` file** in your project root:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **(Optional) Configure Jira prefix:**
   ```bash
   chrono --setup
   ```

## 🎯 Usage

### Basic Usage

```bash
# Stage your changes
git add .

# Generate commit message
chrono
```

### Commands

```bash
chrono              # Generate commit message
chrono --setup      # Configure preferences (Jira prefix)
chrono --help       # Show help
chrono --version    # Show version
```

### Workflow

1. Make your code changes
2. Stage them with `git add`
3. Run `chrono`
4. Choose to:
   - ✅ Use the suggested message
   - ✏️ Edit it manually
   - 🔄 Regenerate a new suggestion
   - ❌ Cancel

## 🎨 Example

```bash
$ git add .
$ chrono

┌  chrono-eis-versiegelung
│
◇  AI suggestion ready!
│
   Suggested message: "feat(auth): add JWT token validation"
│
◆  What would you like to do?
│  ● Use as is (Commit immediately)
│  ○ Edit message
│  ○ Regenerate
│  ○ Cancel
```

## ⚙️ Configuration

### Jira Integration

If you use Jira, configure your project prefix:

```bash
chrono --setup
# Enter: PROJ (for tickets like PROJ-123)
```

This will prefix all commit messages with `[PROJ-X]`.

To remove the prefix, run `chrono --setup` and leave it empty.

## 🛠️ Development

```bash
# Clone the repo
git clone <your-repo-url>
cd chrono-eis-versiegelung

# Install dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=your_key" > .env

# Build
npm run build

# Run locally
npm start
```

## 📝 Requirements

- Node.js 18+
- Git repository
- Gemini API key

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT

## 🙏 Credits

Built with:
- [@clack/prompts](https://github.com/natemoo-re/clack) - Beautiful CLI prompts
- [Google Generative AI](https://ai.google.dev/) - AI-powered commit messages
- [execa](https://github.com/sindresorhus/execa) - Process execution
