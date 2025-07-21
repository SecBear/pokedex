import * as readline from "readline"
import * as process from "process"

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
  if (words.length === 0) {
    rl.prompt()
    return
  }
  console.log(`Your command was: ${words[0]}`)
  rl.prompt()
}

export function startREPL() {
  // display the prompt
  rl.prompt()  
  // listen for input
  rl.on("line", (input) => {handleInput(input)}) 
}

