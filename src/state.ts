import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandInspect } from "./command_inspect.js";
import { commandCatch } from "./command_catch.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";

export type State = {
  // should contain the readline interface and the commands registry
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  pokedex: Record<string, Pokemon>;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

// callback: (state: State) => void
type CLICommand = {
  name: string;
  description: string;
  // callback function includes state
  callback: (state: State, ...args: any) => Promise<void>; // commands: Record<string, CLICommand>) => void;
};

export function initState(): State {
  const state: State = {
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
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
      explore: {
        name: "explore",
        description: "Shows location's pokemon",
        callback: commandExplore,
      },
      catch: {
        name: "catch",
        description: "Attempts to catch pokmeon",
        callback: commandCatch,
      },
      inspect: {
        name: "inspect",
        description: "Examines a caught pokemon",
        callback: commandInspect,
      },
      pokedex: {
        name: "pokedex",
        description: "Lists all caught pokemon",
        callback: commandPokedex,
      },
      // add more commands here
    },
    pokeAPI: new PokeAPI(),
    pokedex: {},
    nextLocationsURL: "",
    prevLocationsURL: "",

    // pointers to update as we go through locations
  };
  return state;
}
