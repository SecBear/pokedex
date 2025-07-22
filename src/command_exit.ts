import { State } from "./state.js"

export function commandExit(state: State): void {
  const test = state.commands.exit.name
  console.log("Closing the Pokedex... Goodbye!")
  process.exit(0)
}
