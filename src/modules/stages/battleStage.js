import { view as attackView, title, gridA, gridB} from "../dom/Attack";
import { view as observeView} from "../dom/observe";
import {container } from "../dom/mainContainer"
import { Ship } from "../logic/Ship";



const battle= async (playerA,playerB, mode)=>{
    container.appendChild(attackView);

    
    if(mode === 'pvnpc'){
        await handlePvNpc(playerA, playerB);
    }

}
const handlePvNpc = async (playerA, playerB)=>{
    return new Promise(async resolve =>{
        attackView.style.display = "grid";
        let stage = 'attack';
        let winner = false;

        while(!winner){
            if(stage === 'attack'){
                //player attacks

                title.innerHTML ="Your turn to attack!";
                gridSyncRester(gridA)
                displayPlayerGrid(playerA.gameboard.getGrid(),gridA);

                toggleEventListener(gridA,playerA.gameboard.getGrid(), 'none');
                toggleEventListener(gridB,playerB.gameboard.getGrid(), 'auto');
                addAttackEventListener(playerB, gridB);

                await waitForAttack(gridB);

                console.log(`fleet A status sunk:${playerA.gameboard.allShipsSunk()}`);
                console.log(`fleet B status sunk:${playerB.gameboard.allShipsSunk()}`);
                if(playerB.gameboard.allShipsSunk()){
                    winner = true;
                    title.innerHTML ="you are the winner";
                }else{
                    stage = 'observe';  
                }    
            }
            else if(stage === 'observe'){
                //computer attacks
                title.innerHTML ="Computers turn to attack!";
                gridSyncRester(gridA)
                displayPlayerGrid(playerA.gameboard.getGrid(),gridA);
                
                toggleEventListener(gridA,playerA.gameboard.getGrid(), 'none');
                toggleEventListener(gridB,playerB.gameboard.getGrid(), 'none');
                //addAttackEventListener(playerA, gridA);
                await new Promise(resolve=> {setTimeout(resolve, 1000)});
                await waitComputerAttack(playerB, playerA, gridA)


                console.log(`fleet A status sunk:${playerA.gameboard.allShipsSunk()}`);
                console.log(`fleet B status sunk:${playerB.gameboard.allShipsSunk()}`);
                
            if(playerA.gameboard.allShipsSunk()){
                    winner = true;
                    title.innerHTML ="you are the winner";
                }else{
                    stage = 'attack';  
                }    
            }
        }
        resolve();
 
    })

}
//ui updaters
const displayPlayerGrid = (playerGrid , uiGameboard)=>{
    playerGrid.forEach((logicRow, yIndex) =>{
        logicRow.forEach((logicCell, xIndex) =>{
            if(logicCell instanceof Ship){
                //get dom cells          
                const logicCellId = `${xIndex},${yIndex}`                
                const cells = uiGameboard.querySelectorAll('.cell');
                //check ship placement in the gameboard 2Darray
                cells.forEach(cell=>{
                    if(cell.id === logicCellId){
                        cell.style.backgroundColor = "#6cf1e6ff";
                    }
                })
            }
            return
        })
    })

}
const gridSyncRester = (uiGameboard)=>{
    const cells = uiGameboard.querySelectorAll('.cell');
    cells.forEach(cell=>{
        cell.style.backgroundColor = "#ffffffff";
    })
}
//asyncronus attacks
const waitForAttack = (grid) =>{
    return new Promise(resolve => {
        grid.addEventListener('click',(e)=>{
            if(e.target.classList.contains('cell')){
              resolve(e.target);  
            }     
        },{once:true});
    })
}
const waitComputerAttack =async(player, opponent, grid)=>{
    return new Promise(resolve=> {
        const { hit, x, y} = player.aiAttack(opponent);
        const cellId = `${x},${y}`
        let cell;
        const cells = grid.querySelectorAll('.cell');
        cells.forEach(item=>{
            if (item.id === cellId) {
                cell = item;
            }
        })
        console.log(cell)
                    
        if(cell){
            if(hit){
                cell.style.backgroundColor = "red";
                cell.style.pointerEvents = 'none';
                cell.style.opacity = '0.5';       
            }else{
                cell.style.pointerEvents = 'none';
                cell.style.opacity ='0.5';
            }
        }  else{
            console.error(`cell with id ${cellId} not found`)
        } 
        resolve();
           
    })
} 

//handles event listeners
const toggleEventListener=(grid,playerGrid, state)=>{
    const cells = grid.querySelectorAll('.cell');

    cells.forEach(cell=>{
        const [y, x] = cell.id.split(',').map(Number);
        console.log(`my cell is: [${y}]`)
        if(playerGrid[x][y] === false){
            cell.style.pointerEvents = 'none';
            cell.style.opacity = '0.5';
        }else{
            cell.style.pointerEvents = state;
        }
    })
    /*
    let cellHasShip;
    playerGrid.forEach((row, y)=>{
        row.forEach((col, x)=>{
            if(col instanceof Ship){
                cellHasShip = `${y},${x}`;
            }
        })
    })
    cells.forEach(cell=>{
        if(cell.id === cellHasShip){}
        cell.style.pointerEvents = state;
    })
    */
}
const addAttackEventListener = (player, grid)=>{
    const cells = grid.querySelectorAll('.cell')

    cells.forEach(cell =>{
        cell.addEventListener('mouseover',()=>{
            cell.style.outline = '2px solid green';
            cell.style.outlineOffset = '-2px';
        })
            cell.addEventListener('mouseout',()=>{
            cell.style.outline = 'none';
            cell.style.outlineOffset = '0px';
        })
        cell.addEventListener('click', ()=>{clickHandler(player.gameboard, cell)});
    })
}


const clickHandler=(playerGrid,cell)=>{
 
    const [y, x] = cell.id.split(',').map(Number);
    console.log(playerGrid.grid[y][x])
    
    if (playerGrid.grid[y][x] === undefined) {
        console.error(`Invalid coordinates: (${y}, ${x})`);
        return;
    }
    if(playerGrid.grid[y][x] !== false){
        console.log(`Cell (${y}, ${x}) has already been attacked.`);
        
    }
    
    const hitStatus =  playerGrid.recieveAttack([y, x]);

    
    console.log(hitStatus);
    if(hitStatus){  
        //hit         
        cell.style.backgroundColor = "black";
        cell.style.pointerEvents = 'none';
        cell.style.opacity='0.5';
                    
    }else if(!hitStatus){
        //miss
        cell.style.pointerEvents = 'none';
        cell.style.opacity = '0.5';      
    }
    return
    

}


export{
    battle
}