import { State } from "./state.js";
import { commandInspect } from "./command_inspect.js";

export async function commandPokedex(state: State): Promise<void> {
  try {
    const pokedex = state.pokedex;
    // check if pokedex is empty
    if (Object.keys(pokedex).length === 0) {
      console.log("No pokemon...");
      return;
    }
    console.log("Your Pokedex:");
    Object.entries(pokedex).forEach(([name, pokemon]) => {
      //commandInspect(state, pokemon.name);
      console.log(` - ${pokemon.name}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Pokedex command failed: ${error.message}, ${error}`);
    } else {
      console.log(`Unknown error: ${error}`);
    }
  }
}
