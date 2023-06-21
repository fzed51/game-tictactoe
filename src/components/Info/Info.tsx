import React, { FC } from "react";
import { PLAYER1, PLAYER1SYMBOL, PLAYER2, PLAYER2SYMBOL, Player } from "../../types";
import { mstos } from "../../utilities/time-helper";

export interface InfoProps {
    time: number;
    currentPlayer: Player;
    onReset: () => void;
}


export const Info: FC<InfoProps> = ({ time, currentPlayer, onReset }) => {
    return <div className="info">
        <div>
            {mstos(time)}
        </div>
        <div>
            joueur {currentPlayer === PLAYER1 && <span>{PLAYER1SYMBOL}</span>}{currentPlayer === PLAYER2 && <span>{PLAYER2SYMBOL}</span>}
        </div>
        <div>
            <button type="button" onClick={onReset}>Recommencer</button>
        </div>
    </div>;
};

export default Info;
