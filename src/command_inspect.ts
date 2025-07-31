import { State } from "./state.js";

export async function commandInspect(
  state: State,
  pokemonName: string,
): Promise<void> {
  console.log(`Running inspect command! with: ${pokemonName}`);
  try {
    // don't need pokeAPI
    if (pokemonName in state.pokedex) {
      const pokemon = state.pokedex[pokemonName];

      // Print pokemon info to console
      console.log(
        `Name: ${pokemon.name}\nHeight: ${pokemon.height}\nWeight: ${pokemon.weight}\n`,
      );
      pokemon.stats.forEach((stat) => {
        console.log(`${stat.stat.name}: ${stat.base_stat}`);
      });
      // types is a list
      if (pokemon.types.length < 1) {
        console.log(`types is empty`);
      }
      pokemon.types.forEach((type) => {
        console.log(`Type: ${type.type.name}`);
      });
    } else {
      console.log("You have not caught that pokemon");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Map command failed: ${error.message}, ${error}`);
    } else {
      console.log(`Unknown error: ${error}`);
    }
  }
}
