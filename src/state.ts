import { createInterface, type Interface } from "readline"
import { commandExit } from './command_exit.js'
import { commandHelp } from './command_help.js'

export type State = {
  // should contain the readline interface and the commands registry
  rl: Interface,
  commands: Record<string, CLICommand>,
}

// callback: (state: State) => void
type CLICommand = {
  name: string;
  description: string;
  // callback function includes state
  callback: (state: State) => void // commands: Record<string, CLICommand>) => void;
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
       // add more commands here
    }
  }
  return state
}
