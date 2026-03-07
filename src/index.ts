#!/usr/bin/env node
import { intro, outro, spinner, select, text, isCancel } from "@clack/prompts";
import { checkIsGitRepo, getStagedDiff, exectCommit } from "./core/git.js";
import { handleError } from "./utils/error-handler.js";
import { generateCommitMessage } from "./core/ai.js";
import { getPreferences, setPreference } from "./core/config.js";
import pc from "picocolors";

const VERSION = "1.0.0";

function showHelp() {
  console.log(`
${pc.bold(pc.cyan('chrono'))} - AI-powered commit message generator

${pc.bold('Usage:')}
  chrono              Generate commit message for staged changes
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
  ${pc.dim('chrono --setup')}            # Set Jira prefix (e.g., PROJ)
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`v${VERSION}`);
    return;
  }

  if (args.includes('--setup')) {
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

  intro(pc.bgCyan(pc.black(" chrono-eis-versiegelung ")));
  try {
    await checkIsGitRepo();
    const diff = await getStagedDiff();

    let finalMessage = "";
    let isDone = false;

    while (!isDone) {
      const s = spinner();
      s.start("AI is thinking of a commit message...");
      const aiMessage = await generateCommitMessage(diff);
      s.stop("AI suggestion ready!");

      console.log(`\n${pc.dim("Suggested message:")} "${pc.cyan(aiMessage)}"`);

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

main();
