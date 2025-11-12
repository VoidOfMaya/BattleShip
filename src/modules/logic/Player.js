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
    aiAttack(opponent){
        let x, y;
        do{
            x = Math.floor(Math.random()* 10);
            y = Math.floor(Math.random()* 10);
        }while(this.#isCellShotAt(opponent.gameboard.getGrid(), x, y)){            
            const hitStatus = opponent.gameboard.recieveAttack([x, y]);

            //const cell = opponent.gameboard.getGrid()[targetY][targetX];
            //return cell instanceof Ship

            return {hit: hitStatus, x , y};

        }
    }
    #isCellShotAt(board, x, y){
        const cell = board[y][x];
        return cell === false || (cell instanceof Ship && cell.hit> 0);
    }
}
export{
    Player
}