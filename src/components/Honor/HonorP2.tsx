import React, { FC } from "react";
import { HonorProps } from "./HonorProps";
import { mstos } from "../../utilities/time-helper";

export const HonorP2: FC<HonorProps> = ({ time, onRestart }) => {
    return <div>
        <div>Joueur 2 a gagné</div>
        <div>
            en {mstos(time)}
        </div>
        <div>
            <button type="button" onClick={onRestart}>Recommencer</button>
        </div>
    </div>;
};

export default HonorP2;