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
import { showEnd } from "./stages/endGameStage";


//initiates game and prompts for game mode
const gameStart = async ()=>{
   //==>new implementation<==
   let playAgain =true;
   //setsgame mode
   //global players:
   while(playAgain){
    let playerA;
    let playerB;
    const mode = await showMenu();
    //fleet setup
        if(mode === 'pvnpc'){
            playerA = new Player();
            playerB = new Player(true);
            
        }else if(mode === 'pvp'){
            //playerA = new Player();
            //playerB = new Player();
            console.warn(`currently unavailable`)
            
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
const newGame = async () =>{
    
}

const battleship=()=>{

    body
    gameStart();
    
}


export {
    battleship,
}