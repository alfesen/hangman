import {keys} from './db.json'
import {HangmanProps, WordProps, KeyboardProps} from './types'

// HANGMAN

export const Hangman = (props: HangmanProps) => {
  const { guesses } = props

  const Head = <div className='head' />
  const Body = <div className='body' />
  const RightArm = <div className='arm right' />
  const LeftArm = <div className='arm left' />
  const RightLeg = <div className='leg right' />
  const LeftLeg = <div className='leg left' />

  const bodyParts = [Head, Body, RightArm, LeftArm, LeftLeg, RightLeg]

  return (
    <div className='hangman'>
      <div className='horizontal-top' />
      <div className='rope' />
      <div className='vertical' />
      <div className='horizontal-bottom' />
      {bodyParts.slice(0, guesses)}
    </div>
  )
}

// WORD

export const Word = (props: WordProps) => {
  const { revelation = false, guessedLetters, word } = props

  return (
    <div className='word'>
      {word.split('').map((letter: string, index: number) => {
        return (
          <span key={`${index}__letter_key`} className='letter'>
            <span
              className={`${
                guessedLetters.includes(letter) || revelation ? 'visible' : ''
              } ${!guessedLetters.includes(letter) ? 'revealed' : ''}`}>
              {letter}
            </span>
          </span>
        )
      })}
    </div>
  )
}

// KEYBOARD

export const Keyboard = (props: KeyboardProps) => {
  const {
    disabled = false,
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
  } = props
  return (
    <div className='keyboard'>
      {keys.map((key: string, index: number) => {
        const isActive = activeLetters && activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key)
        return (
          <button
            disabled={disabled}
            onClick={() => addGuessedLetter(key)}
            className={`button ${isActive ? 'active' : ''} ${
              isInactive ? 'inactive' : ''
            }`}
            key={key}>
            {key}
          </button>
        )
      })}
    </div>
  )
}
