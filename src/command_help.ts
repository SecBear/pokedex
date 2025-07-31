import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Usage:");
  for (const [name, command] of Object.entries(state.commands)) {
    console.log(`${command.name}: ${command.description}`);
  }
}
