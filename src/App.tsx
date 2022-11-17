import { useEffect, useState, useCallback } from 'react'
import { words } from './db.json'
import { Hangman, Word, Keyboard } from './Parts'

function App() {
  const getWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }

  const [word, setWord] = useState(getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrect = guessedLetters.filter(letter => !word.includes(letter))

  const isLoser = incorrect.length >= 6
  const isWinner = word
    .split('')
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isLoser, isWinner]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => document.removeEventListener('keypress', handler)
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return

      e.preventDefault()
      setWord(getWord())
      setGuessedLetters([])
    }

    document.addEventListener('keypress', handler)

    return () => document.removeEventListener('keypress', handler)
  }, [])

  return (
    <div className='App'>
      <div className='message'>
        {isWinner && <h2>You won!</h2>}
        {isLoser && <h2>Sorry</h2>}
      </div>
      <Hangman guesses={incorrect.length} />
      <Word revelation={isLoser} guessedLetters={guessedLetters} word={word} />
      <Keyboard
        disabled={isWinner || (isLoser && true)}
        activeLetters={guessedLetters.filter(letter => word.includes(letter))}
        inactiveLetters={incorrect}
        addGuessedLetter={addGuessedLetter}
      />
    </div>
  )
}

export default App
