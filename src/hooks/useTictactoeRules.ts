import { useReducer } from 'react'
import { BoardTable, Cell, EndGame, Player, PLAYER1, PLAYER2 } from '../types';
import { getCell } from '../utilities/cell-helper';

interface TictactoeState {
    board: BoardTable;
    winner: EndGame;
    nextPlayer: Player;
}

const defaultState: TictactoeState = {
    board: [
        null, null, null,
        null, null, null,
        null, null, null
    ],
    winner: null,
    nextPlayer: PLAYER1
}

const PLAY = "PLAY"
const RESET = "RESET"

interface playActionType {
    type: typeof PLAY;
    player: Player;
    cell: Cell
}

interface resetActionType {
    type: typeof RESET
}

type Actions = playActionType | resetActionType;

const playAction = (player: Player, cell: Cell): playActionType => ({
    type: PLAY,
    player,
    cell
})


const resetAction = (): resetActionType => ({
    type: RESET
})

const reducer = (state: TictactoeState = defaultState, action: Actions): TictactoeState => {
    switch (action.type) {
        case PLAY:
            const nextBoard = state.board.map(
                (old, cell) => cell === action.cell ? action.player : old
            ) as BoardTable
            return ({
                board: nextBoard,
                winner: whoWon(nextBoard),
                nextPlayer: action.player === PLAYER1 ? PLAYER2 : PLAYER1
            });
        case RESET:
            return defaultState
        default:
            return state;
    }
}

export const useTictactoeRules = () => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const handlePlay = (player: Player, cell: Cell) => {
        dispatch(playAction(player, cell))
    }
    const handleReset = () => {
        dispatch(resetAction())
    }
    return [
        state.board,
        state.nextPlayer,
        state.winner,
        handlePlay,
        handleReset
    ] as const
}

const whoWon = (nextBoard: BoardTable): EndGame => {
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
