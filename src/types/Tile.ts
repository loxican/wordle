export enum States {
    Awaiting,
    Unavaliable,
    Misplaced,
    Aligned
}

export interface Props {
    letter: string
    state: States
}

export enum BackgroundColours {
    Awaiting = "#b3b3b3",
    Unavaliable = "#383838",
    Misplaced = "#e3b10b",
    Aligned = "#0be362"
}