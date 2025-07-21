// split user input into words separated by whitespace
export function cleanInput(str: string): string[] {
  return str.trim().toLowerCase().split(" ")
}
