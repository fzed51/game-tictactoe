import { Cell } from "../types"

export const getCell = (l: number, c: number): Cell => {
    return (l * 3 + c) as Cell
}

export const getColumn = (cell: Cell): number => {
    return cell % 3
}

export const getLine = (cell: Cell): number => {
    return Math.floor(cell / 3);
}