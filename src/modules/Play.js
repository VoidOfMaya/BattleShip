import { Player } from "./logic/Player";
import { body, container, router } from "./dom/mainContainer";
import { view as attackView} from "./dom/Attack";
import { view as observeView} from "./dom/observe";
import { view as initView, gameMode} from "./dom/preInit";
import { view as fleetSetView } from "./dom/setFleet";
import { addEventListenerTocells, nextStage } from "./fleetSetFlow";
//import grids
import { Ship } from "./logic/Ship";
import { grid as settingGrid } from './dom/setFleet'

/**
 * sudo game flow
 * check if game started
 * if not display in container a start game button
 * that will prompt  a p vs p or p vs Ai
 * on click display player board in ship placement mode!
 * on the bottom there will be a confirmation button to finalize ship placement,
 * on finalize on both or 1 player game mood switches to  play mode
 * cheks for first to sink apponent ships as winner
 * each player is aloted the follwoing:-
 *  name       -   cell length
 * -Carrier    - 5 cells
 * -battleship - 4 cells
 * -Cruiser    - 3 cells
 * -submarine  - 3 cells
 * -destroyer  - 2 cells
 */ 


let currentMode = 0
const statehandler=()=>{
    /*
    if(!container.hasChildNodes()){
        gameModes.forEach(mode =>{
            container.appendChild(mode);
            mode.style.display = 'none'; 
        });
        gameModes[0].style.display = 'grid'; 
    }
    gameModes[currentMode].style.display = 'none';
    currentMode = (currentMode + 1)% gameModes.length;
    gameModes[currentMode].style.display= "grid";
    */
    
}
/*
const gameState =()=>{
    //router.addEventListener('click', statehandler)
    if(!container.hasChildNodes()){
        gameModes.forEach(mode=>{
            container.appendChild(mode);
            mode.style.display = 'none';
        });
        gameModes[currentMode].style.display = 'grid';
    }else{
        gameModes[currentMode].style= 'none';
        currentMode = (currentMode + 1)% gameModes.length;
        gameModes[currentMode].style.display='grid';
    }
}
*/
//menu
const gameStages ={
    pvp: [fleetSetView, attackView, observeView],
    pvnpc: [fleetSetView, attackView, observeView]
};

const gameRouter = async (mode, currentStageIndex = 0)=>{
    //appendchildren to container  and hide:
    const stages = gameStages[mode]
    stages.forEach(stage => {
        container.appendChild(stage);
        stage.style.display = 'none';
    });
    const currentStage = gameStages[mode][currentStageIndex];
    
    currentStage.style.display = "grid";

    await handleStage(currentStage, mode, currentStageIndex);
};
const handleStage = async(currentStage, mode, currentStageIndex)=>{
    await waitForUserAction(currentStage, mode, currentStageIndex);
};
const waitForUserAction = async(currentStage, mode, currentStageIndex)=>{
    return new Promise(resolve => {
        let nextButton;

        if(mode ==='pvnpc' && currentStageIndex === 0){
            pvnpcFleetHandler();
            nextButton = nextStage;
            console.log(nextButton);
        }
        if(mode ==='pvp' && currentStageIndex === 0){
            console.warn(`Mode not available yet!`);
        }        
        
        
        if(nextButton){
            nextButton.addEventListener('click',()=>{
                currentStage.style.display ='none';

                //if(mode ==='pvnpc' && currentStageIndex === 0){
                //    pvnpcFleetHandler();
                //}
                //if(mode ==='pvp' && currentStageIndex === 0){
                //    console.warn(`Mode not available yet!`);
                //}
                if(currentStageIndex < gameStages[mode].length - 1){
                    currentStageIndex++;
                    currentStage = gameStages[mode][currentStageIndex];
                    currentStage.style.display = 'grid';
                };

            });
            resolve();
        };
        
            
    });
};

const gameStart = ()=>{
    let currentM = initView;
    let mode;
    container.appendChild(currentM);
    currentM.style.display = 'grid';
    const pvpBtn =document.getElementById('pvp');
    const pvnpcBtn =document.getElementById('pvnpc');

    pvpBtn.addEventListener('click',()=>{
        mode = "pvp";
        //currentM.style.display ='none';
        //gameRouter(mode);
        //handleGameFlow(mode);
        console.warn(`Mode not available yet!`);
        
    })
    pvnpcBtn.addEventListener('click',()=>{
        mode = "pvnpc";
        currentM.style.display ='none';
        gameRouter(mode);
        //handleGameFlow(mode);
        //currentM = gameState[1];
        //container.appendChild(currentM);
        //currentM.style.display = 'grid';
        
    })
}

/*
function handleGameFlow(mode) {

    if(mode === "pvp"){
        console.warn(`mode currently unavailable`);
    }
    if(mode === "pvnpc"){
        const mainPlayer = new Player();
        const aiPlayer = new Player(true);
        pvnpcFleetHandler(mainPlayer);
    }
}
    */
const pvnpcFleetHandler=()=>{
    const mainPlayer = new Player();
    const aiPlayer = new Player(true);
    addEventListenerTocells(mainPlayer);
    //const next = nextStage;
    //if(next !== null){
    //    next.addEventListener('click',()=>{
    //        console.log(``);
    //    })
    //}
}

const battleship=()=>{

    body
    //gameState();
    gameStart();
    
      
    

}




export {
    battleship,
}