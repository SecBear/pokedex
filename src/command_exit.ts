import { State } from "./state.js"

export function commandExit(state: State): void {
  const test = state.commands.exit.name
  console.log("Closing the Pokedex... Goodbye!")
  state.rl.close() // close the readline interface
  process.exit(0)
}
