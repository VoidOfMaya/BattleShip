import { view as attackView, grid} from "../dom/Attack";
import { view as observeView} from "../dom/observe";
import {container } from "../dom/mainContainer"
import { nextStage } from "../fleetSetup";

attackView.appendChild(nextStage);

const battle=(playerA,playerB, mode)=>{


    console.log(grid)
    if(mode === 'pvnpc'){
        handlePvNpc();
    }

}
const handlePvNpc = async ()=>{
    container.appendChild(attackView);
    container.appendChild(observeView);
    let stage = 'attack';
    let winner = false;
    while(!winner){
        if(stage === 'attack'){
            attackView.style.display = 'grid';
            
        }
    }
}

export{
    battle
}