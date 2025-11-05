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
}
export{
    Gameboard
}