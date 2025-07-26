import { State } from "./state.js"

export async function commandMap(state: State): Promise<void> {
  console.log(`Running map command!`)
  try {
    const locations = await state.pokeAPI.fetchLocations()
    console.log(locations)
  } catch(error) {
    if (error instanceof Error) {
      console.log(`Map command failed: ${error.message}`)
    } else {
      console.log(`Unknown error: ${error}`)
    }
  }
}
