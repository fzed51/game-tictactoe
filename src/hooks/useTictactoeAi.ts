import { BoardTable, Cell, PLAYER1, PLAYER2, Player } from "../types"
import { whoWon } from "../utilities/ttt-helper"

const minMax = (board: BoardTable, player: Player, target: Player): number => {

    switch(whoWon(board)) {
        case "FULL":
            return 0;
        case PLAYER1:
            return (PLAYER1 === target) ? 1 : -1
        case PLAYER2:
            return (PLAYER2 === target) ? 1 : -1
    }
    let best = 0
    board.forEach((cell, index) => {
        if (cell === null) {
            const newBoard = [...board] as BoardTable
            newBoard[index] = player
            const score = minMax([...newBoard], player * -1 as Player, player)
            best += score
        }
    });
    return best;
}

export const useTictactoeAi = () => {

    const findBestPlay = (board: BoardTable, player: Player): Cell => {
        let best: { score: number; play: Cell } | undefined

        board.forEach((cell, index) => {
            if (cell === null) {
                const newBoard = [...board] as BoardTable
                newBoard[index] = player
                const score = minMax([...newBoard], player * -1 as Player, player)
                console.log(index, score)
                if (!best || best.score < score) {
                    best = {
                        score,
                        play: index as Cell
                    }
                }
            }
        });

        return best?.play ?? 0 as Cell
    }

    return [findBestPlay] as const
}