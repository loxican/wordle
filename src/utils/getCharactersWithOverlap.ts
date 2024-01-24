export function getCharactersWithOverlap(s1: string, s2: string) {
    if (s1.length < s2.length) {
        const newS1 = s1;
        s1 = s2;
        s2 = newS1;
    }

    return [...s1].reduce((a: string[], c, i) => [...a, (s2[i] === c) ? c : ""], []);
}