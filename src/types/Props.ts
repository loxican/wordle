import { EndScreenStates, Hint } from ".";

export interface Row {
    word: string,
    answer: string,
    revealStates?: boolean,
    skipAnimations?: boolean
}

export interface Tile {
    letter: string,
    state: Hint.States,
    duration: number,
    delay: number
}

export interface Key {
    letter: string,
    state: Hint.States,
    width?: string,
    displayLetter?: string
}

export interface EndScreen {
    state: EndScreenStates,
    answer: string,
    onProceed(): void,
    skipDelay?: boolean
}