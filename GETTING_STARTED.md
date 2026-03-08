# Getting Started with Chrono

Quick setup guide for this personal college project.

## What You Need

- Node.js 18+ installed
- A free Google Gemini API key (no credit card needed)
- 5 minutes of your time

## Setup Steps

### 1. Clone This Repository

```bash
git clone https://github.com/Kubrooo/chrono-cli.git
cd chrono-cli
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your Free API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 4. Create .env File

Create a file named `.env` in the project root:

```env
GEMINI_API_KEY=paste_your_key_here
```

### 5. Build the Project

```bash
npm run build
```

### 6. Link Globally (Optional)

To use `chrono` command anywhere:

```bash
npm link
```

Or just run from project directory:

```bash
npm start
```

## First Use

```bash
# Go to any git repository
cd /path/to/your/project

# Make some changes
echo "test" > test.txt

# Stage them
git add test.txt

# Generate commit message
chrono
```

## That's It!

You're ready to use Chrono. Check the [README](README.md) for more details.

## Why Do I Need My Own API Key?

This is a personal college project using the free tier of Google Gemini API. The free tier is generous:

- 15 requests per minute
- 1,500 requests per day
- Completely free, no credit card

Each user needs their own key to stay within these limits.

## Need Help?

- Check [docs/troubleshooting.md](docs/troubleshooting.md)
- Open an issue on GitHub
- Read the full [documentation](docs/)
