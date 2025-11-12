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
        do{
            const x = Math.floor(Math.random()* 10);
            const y = Math.floor(Math.random()* 10);
        }while(this.#isCellShotAt(opponent.gameboard, x, y)){            
            opponent.gameboard.attack([x, y]);
            const cell = opponent.gameboard.getGrid()[targetY][targetX];
            return cell instanceof Ship

        }
    }
    #isCellShotAt(board, x, y){
        const cell = board.getGrid()[y][x];
        return cell === false || (cell instanceof Ship && cell.hit> 0);
    }
}
export{
    Player
}