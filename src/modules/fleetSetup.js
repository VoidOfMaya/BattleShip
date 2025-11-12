import { view as fleetSetView } from "./dom/setFleet";
import { selectedShip, orientation} from "./dom/fleetSelect";
import { createNextBtn } from "./dom/nextstageBtn";
//import grids
import { Ship } from "./logic/Ship";
import { grid as settingGrid } from './dom/setFleet';

//progress button
const next =createNextBtn('nextstage', fleetSetView);
next.style.display = 'none';

//grid ui handlers
const syncGrid = (playerGrid )=>{
    gridSyncRester()

    playerGrid.forEach((logicRow, yIndex) =>{
        logicRow.forEach((logicCell, xIndex) =>{
            if(logicCell instanceof Ship){
                //get dom cells
                const logicCellId = `${xIndex},${yIndex}`                
                const cells = settingGrid.querySelectorAll('.cell');

                //check ship placement in the gameboard 2Darray
                
                cells.forEach(cell=>{
                    if(cell.id === logicCellId){
                        //console.log(cell.id);
                        cell.style.backgroundColor = "#6cf1e6ff";
                    }
                })
            }
            return
        })
    })

}
const gridSyncRester = ()=>{
    const cells = settingGrid.querySelectorAll('.cell');
    cells.forEach(cell=>{
        cell.style.backgroundColor = "#ffffffff";
    })
}

//cell listeners
const addEventListenerTocells = (player)=>{

    const cells = settingGrid.querySelectorAll('.cell');

    cells.forEach(cell =>{
        cell.addEventListener(`click`,(e)=>{
            const clickedId = e.target.id;
            handleCellClick(clickedId, player);
        })
        cell.addEventListener('mouseover',(e)=>{
            const[row, col]= e.target.id.split(',').map(Number)
            ;            
            if(selectedShip && !movingship){
                const ship = getShipByName(selectedShip);
                highlightPreview(player, row, col, ship.length, orientation);
            }
            if(movingship){
                highlightPreview(player, row, col, movingship.getLength(), orientation);
            }
        })
        cell.addEventListener("mouseout",()=>{
            resetPreview();
        })
    })
}
let placedShips = [];
let movingship = null;
//handles click
const handleCellClick = (id, player)=>{
    const[row, col] = id.split(',').map(Number);
    const grid = player.gameboard.getGrid();
    const cellData =grid[col][row];

    //no ship selected, no ship moving currently
    if(!selectedShip && !movingship) return;

    //handels ship selection for movement
    if(cellData instanceof Ship && !movingship){
        movingship = cellData;
        //console.log(`selected ship to move: ${movingship.name}`);
        return;
    }
    //handels an already moving ship
    if(movingship){
        try{
            
            shipMoveHandler(player, movingship, row, col, orientation);
            movingship = null;
            syncGrid(grid);
            console.log(`ship moved successfully.`);
    
        }catch{
            console.error(`Cannot move ship `);
        }
    }
    //prevents duplicates
    if(placedShips.includes(selectedShip)){
        console.log(`Ship "${selectedShip}" already placed.`);
        return;
    }else{
        const ship = getShipByName(selectedShip);
        player.gameboard.populateGrid([row,col], ship.length, selectedShip, orientation);
        placedShips.push(selectedShip);
        syncGrid(grid);

        //disable the ship btn in ui
        const shipDiv = document.getElementById(selectedShip);
        shipDiv.style.pointerEvents = 'none';
        shipDiv.style.opacity = '0.5';  
    }
    //check if all ships are placed
    if(placedShips.length === 5){
        next.style.display = 'block';
        //next.addEventListener('click',()=>{
        //    console.log(`button triggered`);
        //    return next.id;
        //})
    }
}
const getShipByName = (shipName)=>{
    const fleet = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Cruiser', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Destroyer', length: 2 }, 
    ];
    return fleet.find(ship=>ship.name === shipName);
}
const shipMoveHandler=(player, ship, newStartX, newStartY, direction)=>{
        ship.getPositions().forEach(([y, x])=>{
            player.gameboard.grid[y][x]= null;
        });
        ship.resetPositions();
        player.gameboard.populateGrid([newStartX,newStartY], ship.getLength(), ship.name, direction);
        syncGrid(player.gameboard.getGrid());

    }
//handels prieview
const highlightPreview = (player, startR, startC, length, direction)=>{
    resetPreview();
    const cells = settingGrid.querySelectorAll('.cell');
    for (let i = 0; i < length; i++) {
        let row = startR;
        let col = startC;

        if (direction === 'horizontal') row += i;
        if (direction === 'vertical') col += i;

        const cell = Array.from(cells).find(c => c.id === `${row},${col}`);
        if (cell) {
            cell.dataset.preview = 'true'; // mark for reset later
            cell.style.outline = '2px solid #00bfff'; // preview color
            cell.style.outlineOffset = '-2px';
        }
    }

}
const resetPreview=()=>{
    const cells = settingGrid.querySelectorAll('.cell');

    cells.forEach(cell => {
        if (cell.dataset.preview) {
            cell.style.outline = 'none'; // reset to default
            delete cell.dataset.preview;
        }
    });
}
const resetFleet = ()=>{
    placedShips = [];
    movingship = null;
    gridSyncRester();
    const shipButtons = document.querySelectorAll('.ship-btn');
    shipButtons.forEach(button =>{
        button.pointerEvents = 'auto';
        button.style.opacity = '1';
    })
    if(fleetSetView.contains(next)){
        next.style.display = 'none';
    }
}

export{
    addEventListenerTocells,
    resetFleet,
    next
}