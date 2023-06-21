export const mstos = (ms: number): string => {
    const s = Math.round(ms / 100) / 10
    return s + "s"
}