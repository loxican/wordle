export function countOccurrencesOfCharacters(s: string) {
    return [...s].reduce((o: Record<string, number>, c) => {
        o[c] ? o[c]++ : o[c] = 1;
        return o;
    }, {});
}