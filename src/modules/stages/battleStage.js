import { view as attackView, gridA, gridB} from "../dom/Attack";
import { view as observeView} from "../dom/observe";
import {container } from "../dom/mainContainer"



const battle= async (playerA,playerB, mode)=>{
    container.appendChild(attackView);

    
    if(mode === 'pvnpc'){
        handlePvNpc();
    }

}
const handlePvNpc = async ()=>{
    return new Promise(resolve =>{

        let stage = 'attack';
        let winner = false;
        while(!winner){
            if(stage === 'attack'){
                attackView.style.display = "grid";
                
            }
        }
        if(winner){
            resolve();
        }        
    })

}

export{
    battle
}