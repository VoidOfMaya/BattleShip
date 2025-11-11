import { Player } from "./logic/Player";
import { body, container, router } from "./dom/mainContainer";
import { view as attackView} from "./dom/Attack";
import { view as observeView} from "./dom/observe";
import { view as initView, gameMode} from "./dom/preInit";
import { view as fleetSetView } from "./dom/setFleet";
import { addEventListenerTocells, nextStage } from "./fleetSetup";
import { handleAttacking } from "./stages/battleStage";
//import grids
import { Ship } from "./logic/Ship";
import { grid as settingGrid } from './dom/setFleet'
import { showMenu } from "./stages/menuStage";
import { fleetPlacement } from "./stages/fleetSetupStage";
import { battle } from "./stages/battleStage";

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




//initiates game and prompts for game mode
const gameStart = async ()=>{
   //==>new implementation<==
   let playAgain =true;
   //setsgame mode
   //global players:
   while(playAgain){
    let playerA;
    let playerB
    const mode = await showMenu();
    //fleet setup
        if(mode === 'pvnpc'){
            playerA = new Player();
            playerB = new Player(true);
            
        }else if(mode === 'pvp'){
            playerA = new Player();
            playerB = new Player();
            
        }
        await fleetPlacement(playerA, playerB, mode);
    
        //battle loop
        const winner = await battle(mode);
        //end
        await showEnd(winner);

        //prompt new game
        playAgain =await newGame();
    }



}

//handles player vs npc game  flow

const battleship=()=>{

    body
    gameStart();
    
      
    

}




export {
    battleship,
}