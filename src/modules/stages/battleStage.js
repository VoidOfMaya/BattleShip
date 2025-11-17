import { view as attackView, title, gridA, gridB} from "../dom/Attack";
import {container } from "../dom/mainContainer"
import { Ship } from "../logic/Ship";



const battle= async (playerA,playerB, mode)=>{
    container.appendChild(attackView);

    
    if(mode === 'pvnpc'){
        const winner = await handlePvNpc(playerA, playerB);
        if(winner){
            resetGrids(gridA, playerA.gameboard.getGrid());
            resetGrids(gridB, playerB.gameboard.getGrid());
            attackView.style.display = "none";
            return winner
            
        }

    }

}
const handlePvNpc = async (playerA, playerB)=>{
    return new Promise(async resolve =>{
        attackView.style.display = "grid";
        let stage = 'attack';
        let winner = false;
        addAttackEventListener(playerB, gridB);


        while(!winner){
            if(stage === 'attack'){
                //player attacks
                title.innerHTML ="Your turn to attack!";
                gridA.style.outline = "none";
                gridA.style.outlineOffset = '0px';

                gridB.style.outline = "2px solid black";
                gridB.style.outlineOffset = '-2px';

                displayPlayerGrid(playerA.gameboard.getGrid(),gridA);

                toggleEventListener(gridA,playerA.gameboard.getGrid(), 'none');
                toggleEventListener(gridB,playerB.gameboard.getGrid(), 'auto');


                await waitForAttack(gridB, playerB);
                await new Promise(resolve=> {setTimeout(resolve, 500)}); 

                if(playerB.gameboard.allShipsSunk()){
                    winner = true;
                    title.innerHTML ="you are the winner";
                    resolve('PlayerA')
                }else{
                    stage = 'observe';  
                }    
            }
            else if(stage === 'observe'){

                //computer attacks
                title.innerHTML ="Computers turn to attack!";
                gridB.style.outline = "none";
                gridB.style.outlineOffset = '0px';
                
                gridA.style.outline = "2px solid black";
                gridA.style.outlineOffset = '-2px';
                toggleEventListener(gridA,playerA.gameboard.getGrid(), 'none');
                toggleEventListener(gridB,playerB.gameboard.getGrid(), 'none');

                await new Promise(resolve=> {setTimeout(resolve, 1000)});
                await waitComputerAttack(playerB, playerA, gridA) 
                await new Promise(resolve=> {setTimeout(resolve, 500)});  

            if(playerA.gameboard.allShipsSunk()){
                    winner = true;
                    title.innerHTML ="computer has won";
                    resolve('PlayerB')
                }else{
                    stage = 'attack';  
                }    
            }
        }

 
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
                        if (logicCell === "hit"){
                            cell.style.backgroundColor = 'red'
                        }else if( logicCell === false){
                            cell.style.backgroundColor = 'gray'
                        }else if(logicCell instanceof Ship){
                            cell.style.backgroundColor = "#6cf1e6ff";
                        }
                    }
                })
            }
            return
        })
    })

}
//asyncronus attacks
const waitForAttack = (grid, player) =>{
    return new Promise(resolve => {
        const playerGrid = player.gameboard.grid;
        const cells = grid.querySelectorAll('.cell');
  
        const invalidCells = [];
        cells.forEach(cell=>{
            const [y, x] = cell.id.split(',').map(Number);
            if(playerGrid[x][y] === false || playerGrid[x][y] === 'hit'){
                invalidCells.push(cell);

            }
        });
        function handleCellClick(e){
            const cell = e.target.closest('.cell');
            const [y, x] = cell.id.split(',').map(Number);

            invalidCells.push(cell);
            resolve(cell);
        }
        cells.forEach(cell=>{
            
            if(!invalidCells.includes(cell) || !cell.hasAttribute('data-listener-added')){         

                cell.addEventListener('click',handleCellClick,{once:true});

            }
        })
    })
}
//computer attack
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
        });
                    
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
        
        if(playerGrid[x][y] === false || playerGrid[x][y] === "hit"){
            cell.style.pointerEvents = 'none';
            cell.style.opacity = '0.5';
        }else{
            cell.style.pointerEvents = state;
        }
    })

}
//appends event listeners to cells
const addAttackEventListener = (player, grid)=>{
    const cells = grid.querySelectorAll('.cell')

    const clickListener = (e) =>{
        const cell = e.target.closest('.cell');
        if(!cell) return;
        clickHandler(player.gameboard, cell)

    }

    cells.forEach(cell =>{
        if(!cell.hasAttribute('data-listener-added')){

            cell.addEventListener('mouseover',()=>{
            cell.style.outline = '2px solid green';
            cell.style.outlineOffset = '-2px';
                })
            cell.addEventListener('mouseout',()=>{
            cell.style.outline = 'none';
            cell.style.outlineOffset = '0px';
                })
            cell.removeEventListener('click', clickListener);
            cell.addEventListener('click', clickListener,{once:true});
            cell.setAttribute('data-listener-added', 'true');
        }
    })

}
//handels event listener onclick
const clickHandler=(playerGrid,cell)=>{
 
    const [y, x] = cell.id.split(',').map(Number);

    let hitStatus;
    if ( Number.isNaN(x) || Number.isNaN(y) || y < 0 || y > 9 || x < 0 || x > 9 ||playerGrid.grid[x][y] === undefined) {
        console.error(`Invalid coordinates: (${x}, ${y})`);
        return;
    }
    if(playerGrid.grid[x][y] === false || playerGrid.grid[x][y] === 'hit'){
        console.warn(`Cell (${x}, ${y}) has already been attacked.`);
        return
        
    }
    
    if(playerGrid.grid[x][y] instanceof Ship || playerGrid.grid[x][y] === null ){
        hitStatus =  playerGrid.recieveAttack([y, x]);
    }

    
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
//reseting gamebaord
const resetGrids = (grid, playerGrid) =>{
    const cells = grid.querySelectorAll('.cell');
    cells.forEach(cell=>{
        const [y, x] = cell.id.split(',').map(Number);
        playerGrid[x][y] = null
        const clone = cell.cloneNode(true);
        cell.parentNode.replaceChild(clone,cell)
        cell.style.pointerEvents = 'auto';
        cell.style.opacity = '1';
        cell.style.backgroundColor = '';
    })
}

export{
    battle
}