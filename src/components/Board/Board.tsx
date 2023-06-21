import React, { FC } from "react";
import { BoardTable, Cell as CellType, Player, Used } from "../../types";
import { getColumn, getLine } from "../../utilities/cell-helper";
import Cell from "./Cell";
import "./board.scss"

export interface BoardProps {
  board: BoardTable;
  onPlay: (c: CellType) => void
}

export const Board: FC<BoardProps> = ({ board, onPlay }) => {
  const handleUse = (used: Used, cell: CellType) => () => {
    if (used !== null) { return void 0 }
    onPlay(cell)
  };
  return <div className="board">
    {board.map(
      (use, cell) => <Cell
        key={cell}
        column={getColumn(cell as CellType)}
        line={getLine(cell as CellType)}
        onUse={handleUse(use, cell as CellType)}
        used={use}
      />
    )}

  </div>;
};

export default Board;
