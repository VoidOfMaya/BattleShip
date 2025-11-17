import { addEventListenerTocells , resetFleet} from "../fleetSetup";
import { next } from "../fleetSetup";
import { view as fleetSetView } from "../dom/setFleet";
import { container } from "../dom/mainContainer";
const fleetPlacement = async (playerA,playerB, mode)=>{
    return new Promise(async resolve => {    
        container.appendChild(fleetSetView);
        fleetSetView.style.display = 'grid';

        if(mode === 'pvnpc'){
            resetFleet();
            playerB.genFleet();
            await setupPlayerFleet(playerA, 'Finalize player A');
            fleetSetView.style.display = 'none';
        };
        if(mode === 'pvp'){
            resetFleet();
            await setupPlayerFleet(playerA, 'Finalize player A');
            resetFleet();
            await setupPlayerFleet(playerB, 'Finalize player B');
            fleetSetView.style.display = 'none';
        };
        resolve();
    });
};
const setupPlayerFleet = async (player, nextBtn)=>{
    return new Promise(resolve =>{
        addEventListenerTocells(player);
        next.innerHTML = nextBtn;

        if(!fleetSetView.contains(next)){
            fleetSetView.appendChild(next);
        }

        next.addEventListener('click',()=>{
            console.log(`next button has been clicked!`);
            resolve();
        },{once:true});
      
    })
}
 export{
    fleetPlacement
    }