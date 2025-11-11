import { addEventListenerTocells , resetFleet} from "../fleetSetup";
import { nextStage } from "../fleetSetup";
import { view as fleetSetView } from "../dom/setFleet";
import { container } from "../dom/mainContainer";
const fleetPlacement = async (playerA,playerB, mode)=>{

    container.appendChild(fleetSetView);
    fleetSetView.style.display = 'grid';

    if(mode === 'pvnpc'){
        resetFleet();
        playerB.genFleet();
        await setupPlayerFleet(playerA, 'Finalize player A');

    }
    if(mode === 'pvp'){
        resetFleet();
        await setupPlayerFleet(playerA, 'Finalize player A');
        resetFleet();
        await setupPlayerFleet(playerB, 'Finalize player B');

            
             
    }
    
}
const setupPlayerFleet = async (player, nextBtn)=>{
    return new Promise(resolve =>{
        addEventListenerTocells(player);
        nextStage.innerHTML = nextBtn;

        const newNext =nextStage.cloneNode(true);
        Object.assign(nextStage, newNext);


        nextStage.addEventListener('click',()=>{
            resolve();
        },{once:true});
        if(!fleetSetView.contains(nextStage)){
            fleetSetView.appendChild(nextStage);
        }
        
    })
}
 export{
    fleetPlacement
    }