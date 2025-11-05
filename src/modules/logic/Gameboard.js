import { Ship } from "./Ship.js";
class Gameboard{
    //init grid 
    grid = [];

    constructor(){
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    }

    populateGrid([x, y], shipLength){
        if(x > this.grid.length || y > this.grid.length) throw new Error('Ship out of bound!');
        if(this.grid[y][x] !== null) throw new Error('Position occupied!');
        this.grid[y][x]= new Ship(shipLength)

    }
    //if coordinate is null meaning no ship,
    // - set coordinate to false indicating the coordinate is no longer an option;
    recieveAttack([x, y]){
        const cell = this.grid[y][x];

        if(cell === null) this.grid[y][x] = false;
        else  if(cell instanceof Ship){
            cell.hit(1);
        }
    }
    //returns false if atleast one ship is still afloat returns true if all ships are sunk
    allShipsSunk(){
        let allSunk= true;
        this.grid.forEach(row =>{
            row.forEach(cell=>{
                if(cell instanceof Ship && !cell.getIsSunk())allSunk = false ;
            })
        })
        return allSunk;
    }
}
export{
    Gameboard
}