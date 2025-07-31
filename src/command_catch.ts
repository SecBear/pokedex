import { State } from "./state.js";
import { Location, Pokemon } from "./pokeapi.js";

export async function commandCatch(
  state: State,
  pokemonName: string,
): Promise<void> {
  try {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    // catch pokemon
    const pokemon = await state.pokeAPI.catchPokemon(pokemonName);
    // output result
    // if pokemon catch, log ${pokemon} was caught!
    if (pokemon.name !== "") {
      console.log(`${pokemon.name} was caught!`);
      // add to pokedex
      state.pokedex[pokemon.name] = pokemon;
    } else {
      // if pokemon escape, log ${pokemon} escaped!
      console.log(`${pokemonName} escaped!`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Explore command failed: ${error.message}`);
    } else {
      console.log(`Unknown error: ${error}`);
    }
  }
}
