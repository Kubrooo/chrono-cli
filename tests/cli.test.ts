import { describe, it, expect } from 'vitest';
import { parseCliOptions } from '../src/index';

describe('CLI parsing', () => {
  it('should parse the default interactive mode', () => {
    const options = parseCliOptions([]);

    expect(options).toEqual({
      help: false,
      version: false,
      setup: false,
      dryRun: false,
      autoAccept: false,
      message: undefined,
    });
  });

  it('should parse non-interactive flags', () => {
    const options = parseCliOptions(['--yes', '--dry-run']);

    expect(options.autoAccept).toBe(true);
    expect(options.dryRun).toBe(true);
  });

  it('should parse a custom message value', () => {
    const options = parseCliOptions(['--message', 'feat: update auth flow']);

    expect(options.message).toBe('feat: update auth flow');
  });

  it('should support equals syntax for a custom message', () => {
    const options = parseCliOptions(['--message=fix: handle empty diff']);

    expect(options.message).toBe('fix: handle empty diff');
  });

  it('should throw when message is missing a value', () => {
    expect(() => parseCliOptions(['--message'])).toThrow('--message requires a value.');
  });
});
