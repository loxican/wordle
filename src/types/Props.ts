import { EndScreenStates, HintStates } from ".";

export interface Wordle {
    answer: string,
    attempts: string[],
    attemptIndex: number
}

export interface Row {
    word: string,
    answer: string,
    revealStates?: boolean,
    skipAnimations?: boolean
}

export interface Tile {
    letter: string,
    state: HintStates,
    duration: number,
    delay: number,
    forceMute?: boolean
}

export interface Keyboard {
    keyStates: Record<string, HintStates>
}

export interface Key {
    letter: string,
    state: HintStates,
    width?: string,
    displayLetter?: string,
    displaySrc?: string
}

export interface EndScreen {
    state: EndScreenStates,
    answer: string,
    scoreHistory: number[],
    onProceed(): void,
    skipDelay?: boolean
}

export interface ScoreHistory {
    scoreHistory: number[]
}

export interface Icon {
    src: string,
    alt?: string,
    className?: string,
    onPointerDown(): void
}
export interface Message {
    text: string
}