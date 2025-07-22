import { State } from "./state.js"

export function commandHelp(state: State): void {
  console.log("Usage:\n")
  for (const [name, command] of Object.entries(state.commands)) {
    console.log(`${command.name}: ${command.description}`)
  }
}
