export type HangmanProps = {
  guesses: number
}
export type WordProps = {
  revelation?: boolean
  guessedLetters: string[]
  word: string
}
export type KeyboardProps = {
  disabled: boolean
  activeLetters: string[]
  inactiveLetters: string[]
  addGuessedLetter: (letter: string) => void
}
