// mapb
import { State } from "./state.js"

export async function commandMapb(state: State): Promise<void> {
  console.log(`Running map back command with ${state.prevLocationsURL}`)
  try {
    const locations = await state.pokeAPI.fetchLocations(state?.prevLocationsURL)
    console.log(locations)
    // update state, store empty string if we're at the end
    state.prevLocationsURL = locations.previous ? locations.previous : "" 
    state.nextLocationsURL = locations.next ? locations.next : ""
  } catch(error) {
    if (error instanceof Error) {
      console.log(`Map command failed: ${error.message}`)
    } else {
      console.log(`Unknown error: ${error}`)
    }
  }
}
