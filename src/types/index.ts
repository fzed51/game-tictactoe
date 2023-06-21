export const PLAYER1 = 1
export const PLAYER2 = -1

export const PLAYER1SYMBOL = "🔵"
export const PLAYER2SYMBOL = "🔴"

export type Player = typeof PLAYER1 | typeof PLAYER2;

export type EndGame = Player | "FULL" | null

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Used = Player | null

export type BoardTable = [
    Used, Used, Used,
    Used, Used, Used,
    Used, Used, Used
];

