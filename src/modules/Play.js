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
    //set current stage and display
    const currentStage = gameStages[mode][currentStageIndex];
    
    currentStage.style.display = "grid";

    await waitForUserAction(currentStage, mode, currentStageIndex);
};
// waits for stage to complete, by a click event on next stage
const waitForUserAction = async(currentStage, mode, currentStageIndex)=>{
    return new Promise(resolve => {
        let nextButton;
        //run game flow based on  game mode
        if(mode ==='pvnpc' && currentStageIndex === 0){
            pvnpcFleetHandler();
            nextButton = nextStage;
            console.log(nextButton);
        }
        if(mode ==='pvp' && currentStageIndex === 0){
            console.warn(`Mode not available yet!`);
        }else{
            console.error("Something went wrong!");
        }
        
        //progress the gamestage by clicking  the next button
        if(nextButton){
            nextButton.addEventListener('click',()=>{
                currentStage.style.display ='none';

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
//initiates game and prompts for game mode
const gameStart = ()=>{
    let currentM = initView;
    let mode;
    container.appendChild(currentM);
    currentM.style.display = 'grid';
    const pvpBtn =document.getElementById('pvp');
    const pvnpcBtn =document.getElementById('pvnpc');
    //sets mode to player vs player
    pvpBtn.addEventListener('click',()=>{
        mode = "pvp";
        //currentM.style.display ='none';
        //gameRouter(mode);
        console.warn(`Mode not available yet!`);
        
    })
    //sets mode to player vs computer
    pvnpcBtn.addEventListener('click',()=>{
        mode = "pvnpc";
        currentM.style.display ='none';
        gameRouter(mode);

        
    })
}

//handles player vs npc game  flow
const pvnpcFleetHandler=()=>{
    const mainPlayer = new Player();
    const aiPlayer = new Player(true);
    addEventListenerTocells(mainPlayer);
}

const battleship=()=>{

    body
    gameStart();
    
      
    

}




export {
    battleship,
}