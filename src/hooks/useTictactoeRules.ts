import { useReducer } from 'react'
import { BoardTable, Cell, EndGame, Player, PLAYER1, PLAYER2 } from '../types';
import { whoWon } from '../utilities/ttt-helper';

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

