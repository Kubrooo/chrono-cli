# Troubleshooting Guide

## Common Issues

### Installation Issues

#### Command Not Found After Installation

**Problem:**
After cloning and linking the project, the `chrono` command is not recognized.

**Symptoms:**
```bash
$ chrono
bash: chrono: command not found
```

**Solutions:**

1. **Verify you linked the project:**
   ```bash
   npm link
   ```

2. **Check npm global bin directory:**
   ```bash
   npm config get prefix
   ```
   
   Ensure this directory is in your PATH environment variable.

3. **Add npm global bin to PATH (Linux/macOS):**
   ```bash
   echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```

4. **Add npm global bin to PATH (Windows):**
   - Open System Properties > Environment Variables
   - Edit PATH variable
   - Add: `%APPDATA%\npm`

5. **Restart terminal:**
   Close and reopen your terminal after installation.

6. **Run from project directory:**
   ```bash
   cd chrono-cli
   npm start
   ```

#### Permission Errors During Installation (Linux/macOS)

**Problem:**
EACCES or permission denied errors when installing globally.

**Symptoms:**
```bash
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**Solutions:**

1. **Clone the project instead:**
   ```bash
   git clone https://github.com/Kubrooo/chrono-cli.git
   cd chrono-cli
   npm install
   npm run build
   npm link
   ```

2. **Fix npm permissions and link:**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
   source ~/.profile
   npm link
   ```

3. **Use sudo (not recommended):**
   ```bash
   sudo npm link
   ```

#### Build Errors from Source

**Problem:**
Errors when building from source code.

**Symptoms:**
```bash
npm run build
# Various TypeScript compilation errors
```

**Solutions:**

1. **Verify Node.js version:**
   ```bash
   node --version  # Should be 18.0.0 or higher
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Delete and reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Install TypeScript globally:**
   ```bash
   npm install -g typescript
   ```

5. **Check for syntax errors:**
   Review error messages for specific file and line numbers.

### Configuration Issues

#### API Key Not Detected

**Problem:**
Chrono reports that GEMINI_API_KEY is not found.

**Symptoms:**
```bash
$ chrono
Error: GEMINI_API_KEY not found. Please set it in your .env file.
```

**Solutions:**

1. **Verify .env file exists:**
   ```bash
   ls -la .env  # Linux/macOS
   dir .env     # Windows
   ```

2. **Check .env file location:**
   The file must be in your project root (where .git directory is).

3. **Verify .env file contents:**
   ```bash
   cat .env  # Linux/macOS
   type .env # Windows
   ```
   
   Should contain:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```

4. **Check for common mistakes:**
   - File named `.env.txt` instead of `.env`
   - Extra spaces: `GEMINI_API_KEY = key` (incorrect)
   - Quotes around key: `GEMINI_API_KEY="key"` (remove quotes)
   - Wrong variable name: `GEMINI_KEY` (incorrect)

5. **Verify file encoding:**
   Ensure .env file is UTF-8 encoded, not UTF-16 or other encodings.

6. **Restart terminal:**
   Close and reopen terminal after creating .env file.

7. **Check file permissions:**
   ```bash
   chmod 644 .env  # Linux/macOS
   ```

#### Invalid API Key

**Problem:**
API requests fail with authentication errors.

**Symptoms:**
```bash
Error: API request failed
# or
Error: Invalid API key
```

**Solutions:**

1. **Verify key is correct:**
   - Copy key directly from Google AI Studio
   - Ensure no extra characters or spaces
   - Check for line breaks in the key

2. **Generate new key:**
   - Visit https://aistudio.google.com/app/apikey
   - Create a new API key
   - Update .env file with new key

3. **Check key permissions:**
   Ensure the API key has necessary permissions in Google Cloud Console.

4. **Verify API is enabled:**
   Check that Gemini API is enabled for your Google Cloud project.

5. **Check for key expiration:**
   Some API keys may have expiration dates.

#### Configuration Not Persisting

**Problem:**
Jira prefix or other settings reset after restart.

**Symptoms:**
```bash
$ chrono --setup
# Set PROJ as prefix
$ chrono
# Prefix not applied
```

**Solutions:**

1. **Check write permissions:**
   ```bash
   # Linux/macOS
   ls -la ~/.config/chrono-cli/
   
   # Windows
   dir %APPDATA%\chrono-cli
   ```

2. **Verify disk space:**
   ```bash
   df -h  # Linux/macOS
   ```

3. **Check for filesystem errors:**
   Run filesystem check utility for your OS.

4. **Manually verify configuration:**
   ```bash
   # Linux/macOS
   cat ~/.config/chrono-cli/config.json
   
   # Windows
   type %APPDATA%\chrono-cli\config.json
   ```

5. **Reset configuration:**
   ```bash
   # Linux/macOS
   rm -rf ~/.config/chrono-cli/
   
   # Windows
   rmdir /s %APPDATA%\chrono-cli
   ```
   
   Then run `chrono --setup` again.

### Runtime Issues

#### Not a Git Repository Error

**Problem:**
Chrono reports the directory is not a git repository.

**Symptoms:**
```bash
$ chrono
Error: Not a git repository. Run "git init" to initialize a git repository.
```

**Solutions:**

1. **Initialize git repository:**
   ```bash
   git init
   ```

2. **Navigate to repository root:**
   ```bash
   cd /path/to/your/repository
   ```

3. **Verify git installation:**
   ```bash
   git --version
   ```

4. **Check for .git directory:**
   ```bash
   ls -la .git  # Linux/macOS
   dir .git     # Windows
   ```

#### No Staged Changes Error

**Problem:**
Chrono reports no changes are staged.

**Symptoms:**
```bash
$ chrono
Error: No changes are staged. Run "git add <files>" first to stage your changes.
```

**Solutions:**

1. **Check git status:**
   ```bash
   git status
   ```

2. **Stage your changes:**
   ```bash
   git add .              # Stage all changes
   git add file.js        # Stage specific file
   git add src/           # Stage directory
   ```

3. **Verify changes exist:**
   ```bash
   git diff               # Unstaged changes
   git diff --cached      # Staged changes
   ```

4. **Check for ignored files:**
   Review .gitignore to ensure files aren't being ignored.

#### Commit Failed Error

**Problem:**
The commit operation fails.

**Symptoms:**
```bash
Error: Failed to commit. Check your git status again.
```

**Solutions:**

1. **Check git status:**
   ```bash
   git status
   ```

2. **Verify git configuration:**
   ```bash
   git config user.name
   git config user.email
   ```
   
   If not set:
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

3. **Check for merge conflicts:**
   ```bash
   git status
   # Look for "both modified" or "unmerged paths"
   ```

4. **Verify repository state:**
   ```bash
   git log --oneline -5
   ```

5. **Try manual commit:**
   ```bash
   git commit -m "test message"
   ```

### AI Generation Issues

#### Poor Quality Commit Messages

**Problem:**
Generated commit messages are not accurate or useful.

**Symptoms:**
- Generic messages like "update files"
- Incorrect type or scope
- Missing important details
- Too vague or too specific

**Solutions:**

1. **Use regenerate option:**
   When presented with options, select "Regenerate" to get a different suggestion.

2. **Edit the message:**
   Select "Edit message" to refine the AI suggestion.

3. **Stage related changes together:**
   ```bash
   # Instead of:
   git add .
   
   # Do:
   git add src/auth.js tests/auth.test.js
   ```

4. **Break large changes into smaller commits:**
   Commit logical units of work separately.

5. **Provide better context:**
   Ensure your code changes are clear and focused.

6. **Check diff quality:**
   ```bash
   git diff --cached
   ```
   
   Verify the diff accurately represents your changes.

#### API Rate Limiting

**Problem:**
Requests are being rate limited by the Gemini API.

**Symptoms:**
```bash
Error: Rate limit exceeded
# or
Error: Too many requests
```

**Solutions:**

1. **Wait before retrying:**
   Wait 60 seconds before making another request.

2. **Check API quota:**
   Visit Google AI Studio to check your usage and limits.

3. **Reduce regeneration frequency:**
   Avoid repeatedly regenerating messages.

4. **Upgrade API plan:**
   Consider upgrading to a paid plan for higher limits.

5. **Monitor usage:**
   Track your API usage to stay within limits.

#### Slow Response Times

**Problem:**
AI takes a long time to generate messages.

**Symptoms:**
- Spinner runs for more than 10 seconds
- Timeout errors

**Solutions:**

1. **Check internet connection:**
   ```bash
   ping google.com
   ```

2. **Verify API status:**
   Check Google Cloud Status Dashboard for outages.

3. **Reduce diff size:**
   Stage fewer files at once.

4. **Try again later:**
   API performance may vary based on load.

5. **Check for network issues:**
   Verify firewall or proxy settings aren't blocking requests.

### Platform-Specific Issues

#### Windows Issues

**Problem:**
Various issues specific to Windows.

**Solutions:**

1. **Use PowerShell or Command Prompt:**
   Avoid Git Bash for running chrono.

2. **Check PATH separator:**
   Windows uses semicolons (;) not colons (:) in PATH.

3. **Use correct path format:**
   ```bash
   C:\Users\Name\project  # Correct
   C:/Users/Name/project  # May work
   /c/Users/Name/project  # Git Bash format
   ```

4. **Run as Administrator:**
   If permission issues persist, try running terminal as administrator.

5. **Check antivirus:**
   Some antivirus software may block npm or node operations.

#### macOS Issues

**Problem:**
Issues specific to macOS.

**Solutions:**

1. **Install Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```

2. **Check for Gatekeeper blocks:**
   System Preferences > Security & Privacy

3. **Use Homebrew Node.js:**
   ```bash
   brew install node
   ```

4. **Fix permissions:**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

#### Linux Issues

**Problem:**
Issues specific to Linux distributions.

**Solutions:**

1. **Install build essentials:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install build-essential
   
   # Fedora/RHEL
   sudo dnf groupinstall "Development Tools"
   ```

2. **Use Node Version Manager (nvm):**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

3. **Check SELinux:**
   SELinux may block operations on some distributions.

4. **Verify shell configuration:**
   Ensure .bashrc or .zshrc is properly configured.

## Debugging

### Enable Verbose Logging

Currently, chrono doesn't have verbose logging. For debugging:

1. **Check git commands manually:**
   ```bash
   git rev-parse --is-inside-work-tree
   git diff --cached
   git commit -m "test"
   ```

2. **Test API connection:**
   Create a test script:
   ```javascript
   import { GoogleGenerativeAI } from "@google/generative-ai";
   import dotenv from "dotenv";
   
   dotenv.config();
   
   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
   
   const result = await model.generateContent("test");
   console.log(result.response.text());
   ```

3. **Check configuration:**
   ```bash
   # Linux/macOS
   cat ~/.config/chrono-cli/config.json
   
   # Windows
   type %APPDATA%\chrono-cli\config.json
   ```

### Collecting Debug Information

When reporting issues, include:

1. **Version information:**
   ```bash
   chrono --version
   node --version
   npm --version
   git --version
   ```

2. **Operating system:**
   ```bash
   # Linux
   uname -a
   
   # macOS
   sw_vers
   
   # Windows
   ver
   ```

3. **Error messages:**
   Copy the complete error output.

4. **Steps to reproduce:**
   Document exact steps that cause the issue.

5. **Configuration:**
   Share .env.example (never share actual .env).

## Getting Help

If issues persist:

1. **Search existing issues:**
   Check GitHub issues for similar problems.

2. **Create new issue:**
   Provide debug information and steps to reproduce.

3. **Community support:**
   Ask in GitHub Discussions.

4. **Documentation:**
   Review all documentation in the docs/ directory.

## Known Limitations

1. **Interactive only:**
   Chrono requires user interaction and cannot be fully automated.

2. **Single-line messages:**
   Currently generates only single-line commit messages.

3. **English only:**
   AI generates messages in English only.

4. **Internet required:**
   Requires active internet connection for AI API.

5. **API dependency:**
   Relies on Google Gemini API availability.

## Workarounds

### Offline Usage

Chrono requires internet for AI features. For offline commits:

```bash
git commit -m "your manual message"
```

### Custom Message Format

If you need different format:

1. Generate message with chrono
2. Select "Edit message"
3. Modify to your preferred format

### Batch Commits

For multiple commits:

```bash
# Commit 1
git add file1.js
chrono

# Commit 2
git add file2.js
chrono
```

### Integration with Other Tools

Chrono works alongside other git tools:

```bash
# Use with commitizen
git add .
chrono  # or use commitizen

# Use with husky
# Chrono can be used before husky hooks run
```
