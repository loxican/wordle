import { Theme } from "../types";

export function getValueFromTheme<T>(t: Theme.States, o: Theme.Object<T>) {
    return (t === Theme.States.Light) ? o.LIGHT : o.DARK;
}