# Quick Start Guide

Get up and running with Chrono in 2 minutes! ⚡

## Step 1: Install

```bash
npm install -g chrono-eis-versiegelung
```

## Step 2: Get API Key

1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

## Step 3: Configure

Create a `.env` file in your project:

```bash
echo "GEMINI_API_KEY=your_key_here" > .env
```

## Step 4: Use It!

```bash
# Make some changes to your code
# Stage them
git add .

# Generate commit message
chrono
```

That's it! 🎉

## Optional: Jira Integration

If you use Jira tickets:

```bash
chrono --setup
# Enter your project key (e.g., PROJ)
```

Now all commits will be prefixed with `[PROJ-X]`.

## Tips

- Use `chrono --help` to see all commands
- You can edit or regenerate suggestions
- Press Ctrl+C anytime to cancel

Happy committing! 🚀
