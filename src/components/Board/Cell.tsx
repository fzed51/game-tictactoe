import React, { FC } from "react";
import cn from "classnames"
import { PLAYER1, PLAYER1SYMBOL, PLAYER2, PLAYER2SYMBOL, Used } from "../../types";

export interface CellProps {
    used: Used;
    line: number;
    column: number;
    onUse: () => void;
}

export const Cell: FC<CellProps> = ({ column, line, onUse, used }) => {
    return <div className={cn('cell', 'c' + column, 'l' + line, {
        empty: used === null,
        player1: used === PLAYER1,
        player2: used === PLAYER2
    })} onClick={onUse}>
        {used === PLAYER1 && <div>{PLAYER1SYMBOL}</div>}
        {used === PLAYER2 && <div>{PLAYER2SYMBOL}</div>}
        {used === null && <div>&nbsp;</div>}
    </div >;
};

export default Cell;
