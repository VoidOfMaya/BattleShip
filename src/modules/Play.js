import { Player } from "./logic/Player";
import { body} from "./dom/mainContainer";

import { addEventListenerTocells, nextStage, resetFleet } from "./fleetSetup";

//import grids

import { showMenu } from "./stages/menuStage";
import { fleetPlacement } from "./stages/fleetSetupStage";
import { battle } from "./stages/battleStage";
import { showEnd } from "./stages/endGameStage";


//initiates game and prompts for game mode
const gameStart = async ()=>{
   //==>new implementation<==
   let playAgain =true;
   //setsgame mode
   //global players:
 
   while(playAgain){
    let playerA = null;
    let playerB = null
    const mode = await showMenu();
    //fleet setup
        if(mode === 'pvnpc'){
            playerA = new Player();
            playerB = new Player(true);
            
        }else if(mode === 'pvp'){

            alert(`currently unavailable`)
            return
            
        }
        await fleetPlacement(playerA, playerB, mode);
    
        //battle loop
        const winner = await battle(playerA, playerB, mode);
        //end
        const newRound = await showEnd(winner);

        //prompt new game
        playAgain =await newGame(newRound, playerA, playerB);
    }

}
const newGame = async (input, playerA, playerB) =>{
    if(input){
        playerA.gameboard.clearGrid();
        playerB.gameboard.clearGrid();
        resetFleet();
        gameStart();
    }
}

const battleship=()=>{

    body
    gameStart();
    
}


export {
    battleship,
}