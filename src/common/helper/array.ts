export function rotate<T> (arr: T[], index: number): T[] {
    const first = arr.slice(0, index);
    const second = arr.slice(index);
    return [...second, ...first];
}