export function chooseRandomFromArray<T>(a: T[]) {
    return a[Math.floor(Math.random() * a.length)];
}