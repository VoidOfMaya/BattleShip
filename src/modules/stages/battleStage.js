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

        let stage = 'attack';
        let winner = false;
        while(!winner){
            if(stage === 'attack'){
                
                attackView.style.display = "grid";
                title.innerHTML ="Your turn! to attack";
                gridSyncRester(gridA)
                displayPlayerGrid(playerA.gameboard.getGrid(),gridA);
                console.log(playerA.isComputer());
                addAttackEventListener(playerA, gridA);
                winner = true
                
            }
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
                console.log(`Ship found at ${xIndex}, ${yIndex}`);           
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
        cell.addAttackEventListener('click', clickHandler());
    })
}
const clickHandler=()=>{

}


export{
    battle
}