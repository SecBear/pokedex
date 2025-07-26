import * as readline from "readline"
import * as process from "process"
import { commandHelp } from "./command_help.js"
import { commandExit } from "./command_exit.js"
import { commandMap } from "./command_map.js"
import { commandMapb } from "./command_mapb.js"
import { initState } from "./state.js"

// split user input into words separated by whitespace
export function cleanInput(str: string): string[] {
  return str.trim().toLowerCase().split(" ")
}

// Init state
const state = initState()

async function handleInput(input: string) {
  const words = cleanInput(input)

  if (words.length === 0) {
    state.rl.prompt()
    return
  }
  //console.log(`Your command was: ${words[0]}`)
  if (words.includes("help")) {
    commandHelp(state)
  }
  if (words.includes("exit")) {
    commandExit(state)
  }
  if (words.includes("map")) {
    commandMap(state)
  }
  if (words.includes("mapb")) {
    commandMapb(state) 
  }

  state.rl.prompt()
}

export function startREPL() {
  // display welcome message
  console.log("Welcome to the Pokedex!")
  // display the prompt
  state.rl.prompt()
  // listen for input
  state.rl.on("line", async (input) => { await handleInput(input) })
}

