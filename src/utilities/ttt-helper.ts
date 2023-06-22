import { BoardTable, EndGame, PLAYER1, PLAYER2 } from "../types"
import { getCell } from "./cell-helper"

export const whoWon = (nextBoard: BoardTable): EndGame => {
    for (let i = 0; i < 3; i++) {
        const line = (nextBoard[getCell(i, 0)] ?? 0)
            + (nextBoard[getCell(i, 1)] ?? 0)
            + (nextBoard[getCell(i, 2)] ?? 0)
        const column = (nextBoard[getCell(0, i)] ?? 0)
            + (nextBoard[getCell(1, i)] ?? 0)
            + (nextBoard[getCell(2, i)] ?? 0)
        if (Math.abs(line) === 3) {
            if (line / 3 === PLAYER1) {
                return PLAYER1
            }
            return PLAYER2
        }
        if (Math.abs(column) === 3) {
            if (column / 3 === PLAYER1) {
                return PLAYER1
            }
            return PLAYER2
        }
    }
    let diag1 = 0
    let diag2 = 0
    for (let i = 0; i < 3; i++) {
        diag1 += nextBoard[getCell(i, i)] ?? 0
        diag2 += nextBoard[getCell(i, 2-i)] ?? 0
    }
    if (Math.abs(diag1) === 3) {
        if (diag1 / 3 === PLAYER1) {
            return PLAYER1
        }
        return PLAYER2
    }
    if (Math.abs(diag2) === 3) {
        if (diag2 / 3 === PLAYER1) {
            return PLAYER1
        }
        return PLAYER2
    }
    if (nextBoard.filter(c => c === null).length === 0) {
        return "FULL"
    }
    return null;
}