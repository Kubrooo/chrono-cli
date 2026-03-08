# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024

### Initial Release

First release of Chrono as a personal college project.

### Added
- Initial release
- AI-powered commit message generation using Google Gemini
- Conventional commits format support
- Jira ticket prefix integration
- Interactive CLI with edit/regenerate options
- `--setup` command for configuration
- `--help` and `--version` flags
- Comprehensive error handling
- API key validation

### Features
- Generate commit messages from staged git changes
- Edit suggested messages before committing
- Regenerate suggestions if not satisfied
- Optional Jira project prefix
- Beautiful CLI interface with colors and spinners

### Notes
- This is a personal college project
- Requires cloning the repository (not available via npm)
- Each user needs their own free Gemini API key
- Uses Google Gemini free tier API

[1.0.0]: https://github.com/Kubrooo/chrono-cli/releases/tag/v1.0.0
