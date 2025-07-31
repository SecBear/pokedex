import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(60000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
    let locations: ShallowLocations;

    // check if it exists in cache first
    const cachedLocations: ShallowLocations | undefined = this.#cache.get(url);
    if (cachedLocations !== undefined) {
      return cachedLocations;
    }

    // fetch the location data
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      // convert this into a shallow locations type
      locations = await response.json();
      this.#cache.add(url, locations); // add to cache
      return locations; // use the locations.next for the pageURL on the next invocation
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          `Error fetching locationS: ${error.message}\nAre you connected to VPN?`,
        );
      } else {
        console.log(`Unknown error: ${error}`);
      }

      return {
        count: 0,
        next: "",
        previous: null,
        results: [],
      };
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    // check for cache first
    const cachedLocation: Location | undefined = this.#cache.get(url);
    if (cachedLocation !== undefined) {
      return cachedLocation;
    }

    // not cached, fetch it
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const location = await response.json();
      this.#cache.add(url, location); // add to cache
      return location;
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          `Error fetching location: ${locationName} - ${error.message}`,
        );
      } else {
        console.log(`Unknown error: ${error}`);
      }

      return {
        name: "",
        url: "",
        pokemon_encounters: [],
      };
    }
  }

  async catchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    // check for cache first
    const cachedPokemon: Pokemon | undefined = this.#cache.get(url);
    if (cachedPokemon !== undefined) {
      return cachedPokemon;
    }

    // not cached, fetch it
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const pokemon = await response.json();
      this.#cache.add(url, pokemon); // add to cache

      // difficulty of catch based on base exp
      if (!(Math.random() > pokemon.base_experience / 100)) {
        return {
          name: "",
          url: "",
          base_experience: -1,
          height: -1,
          weight: -1,
          stats: [
            {
              base_stat: -1,
              effort: -1,
              stat: {
                id: "",
                name: "",
              },
            },
          ],
          types: [],
        };
      }
      return pokemon;
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          `Error fetching Pokemon: ${pokemonName} - ${error.message}`,
        );
      } else {
        console.log(`Unknown error: ${error}`);
      }

      return {
        name: "",
        url: "",
        base_experience: -1,
        height: -1,
        weight: -1,
        stats: [
          {
            base_stat: -1,
            effort: -1,
            stat: {
              id: "",
              name: "",
            },
          },
        ],
        types: [],
      };
    }
  }
}

export type ShallowLocations = {
  // add properties here
  count: number;
  next: string;
  previous: string | null;
  results: Location[];
};

export type Location = {
  // add properties here
  name: string;
  url: string;
  pokemon_encounters: Encounter[];
};

export type Pokemon = {
  name: string;
  url: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: Stat;
  }[];
  types: PokemonTypeContainer[];
};

type Stat = {
  id: string;
  name: string;
};

type PokemonTypeContainer = {
  slot: number;
  type: PokemonType;
};

type PokemonType = {
  name: string;
  url: string;
};

export type Encounter = {
  pokemon: Pokemon;
};
