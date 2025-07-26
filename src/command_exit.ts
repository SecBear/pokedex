import { State } from "./state.js"

export async function commandExit(state: State):Promise<void> {
  const test = state.commands.exit.name
  console.log("Closing the Pokedex... Goodbye!")
  state.rl.close() // close the readline interface
  process.exit(0)
}
