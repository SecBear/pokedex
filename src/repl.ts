import * as readline from "readline"
import * as process from "process"
import { commandHelp } from "./command_help.js"
import { commandExit } from "./command_exit.js"
import { getCommands } from "./commands.js"
 
// split user input into words separated by whitespace
export function cleanInput(str: string): string[] {
  return str.trim().toLowerCase().split(" ")
}

// Readline interface for I/O
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Pokedex > ',
})

function handleInput(input: string) {
  const words = cleanInput(input)
  const commands = getCommands()
  if (words.length === 0) {
    rl.prompt()
    return
  }
  //console.log(`Your command was: ${words[0]}`)
  if (words.includes("help")) {
    commandHelp(commands)
  }
  if (words.includes("exit")) {
    commandExit(commands)
  }

  rl.prompt()
}

export function startREPL() {
  // display welcome message
  console.log("Welcome to the Pokedex!")
  // display the prompt
  rl.prompt()  
  // listen for input
  rl.on("line", (input) => {handleInput(input)}) 
}

