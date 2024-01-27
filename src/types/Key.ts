export interface Props {
    letter: string,
    state: States,
    classes?: string,
    displayLetter?: string
}

export enum States {
    Unassigned,
    Unavaliable,
    Misplaced,
    Aligned
}

export enum BackgroundColours {
    Default = "#b3b3b3",
    Unavaliable = "#383838",
    Misplaced = "#e3b10b",
    Aligned = "#0be362"
}