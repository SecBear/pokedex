import { createInterface, type Interface } from "readline"
import { commandExit } from './command_exit.js'
import { commandHelp } from './command_help.js'
import { commandMap } from './command_map.js'
import { commandMapb } from './command_mapb.js'
import { PokeAPI, } from "./pokeapi.js"

export type State = {
  // should contain the readline interface and the commands registry
  rl: Interface,
  commands: Record<string, CLICommand>,
  pokeAPI: PokeAPI,
  nextLocationsURL: string,
  prevLocationsURL: string,
}

// callback: (state: State) => void
type CLICommand = {
  name: string;
  description: string;
  // callback function includes state
  callback: (state: State) => Promise<void> // commands: Record<string, CLICommand>) => void;
}

export function initState(): State {
  const state: State = {
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Pokedex > ',
    }),
    commands: {
      help: {
         name: "help",
         description: "Displays a help message",
         callback: commandHelp,
       },
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
      },
      map: {
        name: "map",
        description: "Shows Next Location",
        callback: commandMap,
      },
      mapb: {
        name: "mapb",
        description: "Shows Previous location",
        callback: commandMapb,
      },
       // add more commands here
    },
    pokeAPI: new PokeAPI,
    nextLocationsURL: "",
    prevLocationsURL: "",
    
    // pointers to update as we go through locations
  }
  return state
}
