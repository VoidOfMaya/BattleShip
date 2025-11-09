import { Player } from "./logic/Player";
import { body, container, router } from "./dom/mainContainer";
import { view as attackView} from "./dom/Attack";
import { view as observeView} from "./dom/observe";
import { view as initView} from "./dom/preInit";
import { view as fleetSetView } from "./dom/setFleet";
//import grids
import { grid as settingGrid } from "./dom/setFleet";

//import objects
import { Ship } from "./logic/Ship";
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
const fleet = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Cruiser', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Destroyer', length: 2 }, 
];
let currentMode = 0;
const gameModes =[initView, fleetSetView, attackView, observeView];

const statehandler=()=>{
    
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

    
}
const gameState =()=>{
    router.addEventListener('click', statehandler)
}
const syncGrid = (playerGrid )=>{

    playerGrid.forEach((logicRow, yIndex) =>{

        logicRow.forEach((logicCell, xIndex) =>{
            if(logicCell instanceof Ship){
                gridSyncRester();
                //console.log(`cell contains ${Rindex}${Cindex} = ${logicCell instanceof Ship}`)
                //get dom cells
                const logicCellId = `${xIndex},${yIndex}`                
                const cells = settingGrid.querySelectorAll('.cell');
                
                cells.forEach(cell=>{
                    if(cell.id === logicCellId){
                        console.log(cell.id);
                        cell.style.backgroundColor = "#6cf1e6ff";
                        
                    }else{
                        //cell.style.backgroundColor = "#ffffffff";
                    }
                })
            }
            return
        })
    })

}
const gridSyncRester = ()=>{
    const cells = settingGrid.querySelectorAll('.cell');
    cells.entries(cell=>cell.style.backgroundColor = "#ffffffff")
}

const addEventListenerTocells = (player, shipLength)=>{

    const cells = settingGrid.querySelectorAll('.cell');

    cells.forEach(cell =>{
        cell.addEventListener(`click`,(e)=>{
            const clickedId = e.target.id;
            handleCellClick(clickedId, player, shipLength);
        })
    })
}
const handleCellClick = (id, player, shipLength)=>{
    const[row, col] = id.split(',').map(Number);
    player.gameboard.populateGrid([row,col], shipLength);
    console.log(`[${row},${col}]`)
    syncGrid(player.gameboard.getGrid());

}

const battleship=()=>{
    const mainPlayer = new Player();
    const aiPlayer = new Player(true);
    body
    gameState();
    console.log(mainPlayer.gameboard.getGrid());

    addEventListenerTocells(mainPlayer, 5);
 
   // mainPlayer.gameboard.populateGrid([5,6], 4);
    //mainPlayer.gameboard.populateGrid([1,1], 5);
    //mainPlayer.gameboard.populateGrid([7,2], 3, "vertical");
    //syncGrid(mainPlayer.gameboard.getGrid());
    
    

}




export {
    battleship,
}