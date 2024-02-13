import { EndScreenStates, HSL, HintStates, Theme } from ".";

export interface Wordle {
    answer: string,
    attempts: string[],
    attemptIndex: number,
    firstLoad?: boolean,
    theme: Theme.States
}

export interface Row {
    word: string,
    answer: string,
    revealStates?: boolean,
    skipAnimations?: boolean,
    theme: Theme.States
}

export interface Tile {
    letter: string,
    state: HintStates,
    duration: number,
    delay: number,
    theme: Theme.States
}

export interface Keyboard {
    keyStates: Record<string, HintStates>,
    firstLoad?: boolean,
    theme: Theme.States
}

export interface Key {
    letter: string,
    state: HintStates,
    width?: string,
    displayLetter?: string,
    displaySrc?: string,
    theme: Theme.States
}

export interface EndScreen {
    state: EndScreenStates,
    answer: string,
    scoreHistory: number[],
    onProceed(): void,
    skipDelay?: boolean,
    theme: Theme.States
}

export interface ScoreHistory {
    scoreHistory: number[],
    backgroundColour: HSL,
    theme: Theme.States
}

export interface Icon {
    src: string,
    alt?: string,
    className?: string,
    onClick(): void
}

export interface MessageList {
    texts: string[],
    theme: Theme.States
}
export interface Message {
    text: string,
    theme: Theme.States
}