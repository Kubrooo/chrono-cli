#!/usr/bin/env node
import { intro, outro, spinner, select, text, isCancel } from "@clack/prompts";
import { checkIsGitRepo, getStagedDiff, getStagedFiles, exectCommit } from "./core/git.js";
import { handleError } from "./utils/error-handler.js";
import { generateCommitMessage } from "./core/ai.js";
import { setPreference } from "./core/config.js";
import pc from "picocolors";

const VERSION = "1.0.0";

type CliOptions = {
  help: boolean;
  version: boolean;
  setup: boolean;
  dryRun: boolean;
  autoAccept: boolean;
  message?: string;
};

function getFlagValue(args: string[], flag: string) {
  const flagIndex = args.findIndex((arg) => arg === flag || arg.startsWith(`${flag}=`));

  if (flagIndex === -1) {
    return undefined;
  }

  const flagArg = args[flagIndex];

  if (flagArg.includes("=")) {
    return flagArg.slice(flag.length + 1);
  }

  const value = args[flagIndex + 1];

  if (!value || value.startsWith("-")) {
    throw new Error(`${flag} requires a value.`);
  }

  return value;
}

export function parseCliOptions(args: string[]): CliOptions {
  return {
    help: args.includes("--help") || args.includes("-h"),
    version: args.includes("--version") || args.includes("-v"),
    setup: args.includes("--setup"),
    dryRun: args.includes("--dry-run"),
    autoAccept: args.includes("--yes") || args.includes("-y"),
    message: getFlagValue(args, "--message"),
  };
}

function showHelp() {
  console.log(`
${pc.bold(pc.cyan('chrono'))} - AI-powered commit message generator

${pc.bold('Usage:')}
  chrono              Generate commit message for staged changes
  chrono --yes        Generate and commit without prompting
  chrono --dry-run    Show the generated message without committing
  chrono --message    Commit with a custom message without prompting
  chrono --setup      Configure Jira prefix and preferences
  chrono --help       Show this help message
  chrono --version    Show version number

${pc.bold('Setup:')}
  1. Create a .env file with: GEMINI_API_KEY=your_key_here
  2. Get your API key from: ${pc.underline('https://aistudio.google.com/app/apikey')}
  3. Stage your changes: ${pc.dim('git add .')}
  4. Run: ${pc.dim('chrono')}

${pc.bold('Examples:')}
  ${pc.dim('git add .')}
  ${pc.dim('chrono')}                    # Generate commit message
  ${pc.dim('chrono --yes')}              # Commit using the AI suggestion immediately
  ${pc.dim('chrono --dry-run')}          # Preview the AI suggestion only
  ${pc.dim('chrono --message "fix: ..."')} # Commit with your own message
  ${pc.dim('chrono --setup')}            # Set Jira prefix (e.g., PROJ)
`);
}

function printStagedChanges(files: string) {
  console.log(pc.dim('\nStaged changes:'));
  files.split('\n').filter(Boolean).forEach(line => {
    const [status, file] = line.split('\t');
    const statusColor = status === 'A' ? pc.green : status === 'M' ? pc.yellow : pc.red;
    const statusText = status === 'A' ? 'Added' : status === 'M' ? 'Modified' : 'Deleted';
    console.log(`  ${statusColor(statusText.padEnd(8))} ${pc.dim(file)}`);
  });
  console.log('');
}

async function commitWithMessage(message: string) {
  const sCommit = spinner();
  sCommit.start("Executing commit...");
  await exectCommit(message);
  sCommit.stop(pc.green("✔ Commit successful!"));
}

async function showGeneratedMessage(diff: string) {
  const s = spinner();
  s.start("AI is thinking of a commit message...");
  const aiMessage = await generateCommitMessage(diff);
  s.stop("AI suggestion ready!");

  console.log(`\n${pc.dim("Suggested message:")}`);
  console.log(pc.cyan(aiMessage));

  return aiMessage;
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseCliOptions(args);
  
  if (options.help) {
    showHelp();
    return;
  }

  if (options.version) {
    console.log(`v${VERSION}`);
    return;
  }

  if (options.setup) {
    intro(pc.bgMagenta(pc.black(" CHRONO SETUP ")));
    
    const jira = await text({
      message: 'Enter your Jira Project Key (leave empty to skip):',
      placeholder: 'e.g., PROJ',
    });

    if (isCancel(jira)) return;

    setPreference('jiraPrefix', jira);
    
    outro(pc.green('Preferences saved successfully!'));
    return;
  }

  intro(pc.bgCyan(pc.black(" chrono ")));
  try {
    await checkIsGitRepo();
    
    const files = await getStagedFiles();
    printStagedChanges(files);
    
    const diff = await getStagedDiff();

    if (options.message) {
      console.log(pc.dim('Using custom message from the command line.'));

      if (options.dryRun) {
        console.log(`\n${pc.dim('Dry run message:')}`);
        console.log(pc.cyan(options.message));
        outro(pc.yellow('Dry run complete. No commit was created.'));
        return;
      }

      await commitWithMessage(options.message);
      outro(pc.bgGreen(pc.black(" DONE ")));
      return;
    }

    if (options.dryRun || options.autoAccept) {
      const aiMessage = await showGeneratedMessage(diff);

      if (options.dryRun) {
        outro(pc.yellow('Dry run complete. No commit was created.'));
        return;
      }

      await commitWithMessage(aiMessage);
      outro(pc.bgGreen(pc.black(" DONE ")));
      return;
    }

    let finalMessage = "";
    let isDone = false;

    while (!isDone) {
      const s = spinner();
      s.start("AI is thinking of a commit message...");
      const aiMessage = await generateCommitMessage(diff);
      s.stop("AI suggestion ready!");

      console.log(`\n${pc.dim("Suggested message:")}`);
      console.log(pc.cyan(aiMessage));

      const action = await select({
        message: "What would you like to do?",
        options: [
          { value: "yes", label: "Use as is", hint: "Commit immediately" },
          { value: "edit", label: "Edit message", hint: "Modify manually" },
          {
            value: "retry",
            label: "Regenerate",
            hint: "Ask AI for another idea",
          },
          { value: "no", label: "Cancel", hint: "Abort" },
        ],
      });

      if (isCancel(action) || action === "no") {
        outro(pc.yellow("Commit aborted."));
        return;
      }

      if (action === "retry") {
        console.log(pc.italic(pc.dim("  Retrying...")));
        continue; 
      }

      if (action === "edit") {
        console.log(pc.dim("\nTip: For multi-line messages, use \\n for line breaks"));
        const edited = await text({
          message: "Edit your commit message:",
          initialValue: aiMessage,
        });

        if (isCancel(edited)) return;
        finalMessage = edited as string;
      } else {
        finalMessage = aiMessage;
      }

      isDone = true;
    }

    const sCommit = spinner();
    sCommit.start("Executing commit...");
    await exectCommit(finalMessage);
    sCommit.stop(pc.green("✔ Commit successful!"));

    outro(pc.bgGreen(pc.black(" DONE ")));
  } catch (error) {
    handleError(error);
  }
}

const isDirectExecution = Boolean(
  process.argv[1] && (
    process.argv[1].endsWith("src/index.ts") ||
    process.argv[1].endsWith("dist/index.js")
  )
);

if (isDirectExecution) {
  main();
}
