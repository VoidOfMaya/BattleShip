import { Gameboard } from "./Gameboard"
import { Ship } from "./Ship";

class Player{
    #isAi =false
    constructor(enableAi){
        this.gameboard= new Gameboard();
        this.#isAi= enableAi
    }
    isComputer(){
        if(this.#isAi) return true;
        else return false;
    }
    genFleet(){
        if(this.#isAi){
            const fleet = [
                { name: 'Carrier', length: 5 },
                { name: 'Battleship', length: 4 },
                { name: 'Cruiser', length: 3 },
                { name: 'Submarine', length: 3 },
                { name: 'Destroyer', length: 2 }, 
            ];
            fleet.forEach(ship =>{
                let placed = false;
                while(!placed){
                    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                    const x = Math.floor(Math.random()* 10);
                    const y = Math.floor(Math.random()* 10);
                    try{
                        this.gameboard.populateGrid([x, y], ship.length, ship.name, direction);
                        placed = true
                    }catch(error){
                        
                    }
                }
            })
        }
    }
    aiAttack(opponent,){
        let x, y;
        do{
            x = Math.floor(Math.random()* 10);
            y = Math.floor(Math.random()* 10);
        }while(this.#isCellShotAt(opponent.gameboard.getGrid(), x, y)){            
            const hitStatus = opponent.gameboard.recieveAttack([x, y]);

            return {hit: hitStatus, x , y};

        }
    }
    #isCellShotAt(board, x, y){
        const cell = board[y][x];
        return cell === false || cell === "hit" ;
    }
    //attempt at a smarter ai (not required for the project)
    #huntShip(x, y, opponent){
        const nearByCells = [
            [x, y -1],
            [x, y + 1],
            [x -1 , y],
            [x + 1, y]
        ]
        let validCells = [];
        nearByCells.forEach(cell=>{
            const [newX,newY] = cell;
            if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
                // Check if the cell is either a miss (false) or "hit" (already attacked)
                const cellStatus = opponent.gameboard.getGrid()[newY][newX];
                if (cellStatus !== false && cellStatus !== "hit") {
                    validCells.push([newX, newY]);
                }
            }
        })
        if (validCells.length > 0){
            const randomIndex = Math.floor(Math.random() * validCells.length);
            const [targetX, targetY] = validCells[randomIndex];
            console.log( `valid next moves: ${validCells}`);
            return{targetX, targetY};
   
        }
        return null;

    }
}

export{
    Player
}