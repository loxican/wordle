export enum States {
    Light,
    Dark
}

export interface Object<T> {
    LIGHT: T
    DARK: T
}