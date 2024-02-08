import { Theme } from "../types";

export function getColourFromTheme(theme: Theme.States, colour: Theme.Colours) {
    return (theme === Theme.States.Light) ? colour.LIGHT : colour.DARK;
}