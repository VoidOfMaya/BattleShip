import { view as attackView, title, gridA, gridB} from "../dom/Attack";
import { view as observeView} from "../dom/observe";
import {container } from "../dom/mainContainer"
import { Ship } from "../logic/Ship";



const battle= async (playerA,playerB, mode)=>{
    container.appendChild(attackView);

    
    if(mode === 'pvnpc'){
        handlePvNpc(playerA, playerB);
    }

}
const handlePvNpc = async (playerA, playerB)=>{
    return new Promise(resolve =>{
        attackView.style.display = "grid";
        let stage = 'attack';
        let winner = false;
        while(!winner){
            if(stage === 'attack'){
                //player attacks

                title.innerHTML ="Your turn to attack!";
                gridSyncRester(gridA)
                displayPlayerGrid(playerA.gameboard.getGrid(),gridA);
                addAttackEventListener(playerB, gridB);
                stage = 'observe';
                
                
            }else if(stage = 'observe'){
                //computer attacks
                title.innerHTML ="Computers turn to attack!";
                gridSyncRester(gridA)
                displayPlayerGrid(playerA.gameboard.getGrid(),gridA);
                console.log(playerA.isComputer());
                addAttackEventListener(playerA, gridB);
            }
            winner = true
        }
        //if(winner){
        //    resolve();
        //}        
    })

}
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

}


export{
    battle
}