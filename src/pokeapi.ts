import { Cache } from "./pokecache.js"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache

  constructor() {
    this.#cache = new Cache(60000)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`
    let locations: ShallowLocations
    // check if it exists in cache first
    const cachedLocations: ShallowLocations | undefined = this.#cache.get(url)
    if (cachedLocations !== undefined) {
      return cachedLocations
    }
    // fetch the location data
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      // convert this into a shallow locations type
      locations = await response.json()
      // add to cache
      this.#cache.add(url, locations)
      return locations // use the locations.next for the pageURL on the next invocation
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error fetching locationS: ${error.message}`)
      }
      else {
        console.log(`Unknown error: ${error}`)
      }      
      return {
        count: 0,
        next: "",
        previous: null,
        results: [], 
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    let location: Location
    const url = `${PokeAPI.baseURL}/location/${locationName}`
    try {
      const response = await fetch(url)
      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error fetching location: ${locationName} - ${error.message}`)
      }
      else {
        console.log(`Unknown error: ${error}`)
      }
      return {
        name: "",
        url: "",
      }
    }
    
  }
}

export type ShallowLocations = {
  // add properties here
  count: number,
  next: string,
  previous: string | null
  results: Location[],
};

export type Location = {
  // add properties here
  name: string,
  url: string,
};

