# Installation Guide

## Important Note

This is a personal college project. To use Chrono, you need to:
1. Clone the repository (not available via npm install)
2. Provide your own free Google Gemini API key
3. Build and link the project locally

This approach is used because the project uses the free tier of Gemini API, and each user needs their own API key.

## System Requirements

- Node.js version 18.0.0 or higher
- npm version 8.0.0 or higher
- Git version 2.0.0 or higher
- Active internet connection for AI API calls

## Installation Methods

### Clone and Setup (Required Method)

Since this is a personal project, you must clone the repository:

```bash
# Clone the repository
git clone https://github.com/Kubrooo/chrono-cli.git
cd chrono-cli

# Install dependencies
npm install

# Create .env file with your API key
echo "GEMINI_API_KEY=your_key_here" > .env

# Build the project
npm run build

# Link globally to use 'chrono' command anywhere
npm link
```

After linking, verify it works:

```bash
chrono --version
```

### Run Without Global Link

If you prefer not to link globally:

```bash
# From the project directory
npm start

# Or for development
npm run dev
```

### Global Installation (Not Available)

Note: This project is NOT published to npm. The following will NOT work:

```bash
# This does NOT work - project is not on npm
npm install -g chrono-cli  # ❌ Not available
```

### Local Project Installation (Not Applicable)

Note: This method is not applicable since the project is not published to npm.

### Installation from Source

This is the same as the required method above. For development:

```bash
# Clone the repository
git clone https://github.com/Kubrooo/chrono-cli.git
cd chrono-cli

# Install dependencies
npm install

# Build the project
npm run build

# Link globally
npm link
```

## Post-Installation Setup

### 1. Obtain Gemini API Key

Chrono requires a Google Gemini API key to function:

1. Navigate to Google AI Studio: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Select an existing Google Cloud project or create a new one
5. Copy the generated API key

Note: The Gemini API has a free tier with generous limits suitable for personal use.

### 2. Configure Environment Variables

Create a `.env` file in your project root directory:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

Important security notes:
- Never commit the `.env` file to version control
- Add `.env` to your `.gitignore` file
- Do not share your API key publicly
- Rotate your API key if it becomes compromised

### 3. Verify Installation

Test that chrono is properly configured:

```bash
# Make a test change
echo "test" > test.txt

# Stage the change
git add test.txt

# Run chrono
chrono
```

If configured correctly, chrono will generate a commit message suggestion.

## Troubleshooting Installation Issues

### Command Not Found

If you receive a "command not found" error after global installation:

1. Check npm global bin directory:
   ```bash
   npm config get prefix
   ```

2. Ensure this directory is in your PATH environment variable

3. On Windows, you may need to restart your terminal

### Permission Errors (Linux/macOS)

If you encounter EACCES errors during global installation:

```bash
# Option 1: Use npx (recommended)
npx chrono-cli

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
npm link  # Use npm link since you cloned the repo
```

### API Key Not Detected

If chrono reports that the API key is not found:

1. Verify the `.env` file is in the correct directory (project root)
2. Check the file name is exactly `.env` (not `.env.txt`)
3. Ensure the key format is: `GEMINI_API_KEY=your_key`
4. Verify there are no extra spaces or quotes around the key
5. Restart your terminal after creating the `.env` file

### Build Errors

If building from source fails:

1. Ensure you have TypeScript installed: `npm install -g typescript`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
4. Check Node.js version: `node --version` (must be 18+)

## Updating Chrono

### From Cloned Repository

Since this is a cloned project, update by pulling latest changes:

```bash
cd chrono-cli
git pull origin main
npm install
npm run build
```

### Check Current Version

```bash
chrono --version
```

## Uninstallation

### Unlink Global Command

```bash
npm unlink
```

### Remove Cloned Repository

```bash
cd ..
rm -rf chrono-cli  # Linux/macOS
rmdir /s chrono-cli  # Windows
```

### Clean Up Configuration

Chrono stores configuration in your system's config directory. To remove it:

**Linux/macOS:**
```bash
rm -rf ~/.config/chrono-cli
```

**Windows:**
```bash
rmdir /s "%APPDATA%\chrono-cli"
```
