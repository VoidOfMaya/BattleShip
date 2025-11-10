import { Player } from "./logic/Player";
import { body, container, router } from "./dom/mainContainer";
import { view as attackView} from "./dom/Attack";
import { view as observeView} from "./dom/observe";
import { view as initView, gameMode} from "./dom/preInit";
import { view as fleetSetView } from "./dom/setFleet";
import { addEventListenerTocells } from "./fleetSetFlow";
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

const gameModes =[initView, fleetSetView, attackView, observeView];
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


const battleship=()=>{
    const mainPlayer = new Player();
    const aiPlayer = new Player(true);
    body
    gameState();
    addEventListenerTocells(mainPlayer);
      
    

}




export {
    battleship,
}