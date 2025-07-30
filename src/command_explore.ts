import { State } from "./state.js";
import { Location, Pokemon } from "./pokeapi.js";

export async function commandExplore(
  state: State,
  locationStr: string,
): Promise<void> {
  try {
    console.log(`Exploring ${locationStr}...`);
    const location = await state.pokeAPI.fetchLocation(locationStr);
    console.log(`raw location data: ${location}`);
    // collect pokemon from location
    const pokemonArr = location.pokemon_encounters.map(
      (encounter) => encounter.pokemon.name,
    );
    // output each pokemon
    console.log(`Found Pokemon:`);
    pokemonArr.forEach((pokemon) => console.log(`- ${pokemon}`));
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Explore command failed: ${error.message}`);
    } else {
      console.log(`Unknown error: ${error}`);
    }
  }
}
