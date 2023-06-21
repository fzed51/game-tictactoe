import React, { FC } from "react";
import { HonorProps } from "./HonorProps";
import { mstos } from "../../utilities/time-helper";

export const NoHonor: FC<HonorProps> = ({ time, onRestart }) => {
    return <div>
        <div>March nul</div>
        <div>
            en {mstos(time)}
        </div>
        <div>
            <button type="button" onClick={onRestart}>Recommencer</button>
        </div>
    </div>;
};

export default NoHonor;