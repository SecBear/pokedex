import { CLICommand } from "./commands.js"

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Usage:\n")
  for (const [name, command] of Object.entries(commands)) {
    console.log(`${command.name}: ${command.description}`)
  }
}
