import { Ship } from "./Ship.js";
class Gameboard{
    //init grid 
    grid = [];

    constructor(){
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    }

    populateGrid([x, y], shipLength, direction = "horizontal"){
        
        if (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid.length) {
            throw new Error('Starting position out of bounds!');
        } 
        const ship = new Ship(shipLength)      

        if(direction === "horizontal"){
            if(x + shipLength> this.grid.length) throw new Error('ship out of bounds horizontally');
            for(let i = 0; i < shipLength; i++){
                if(this.grid[y][x+i]!== null)throw new Error('Position occupied');
            } 
            for(let i = 0;i <shipLength; i++){
                this.grid[y][x + i]= ship;
            }  

        }
        if(direction === "vertical"){
            if(y+ shipLength > this.grid.length)throw new Error('ship out of bounds vertically');
            for(let i = 0; i < shipLength; i++){
                if(this.grid[y+1][x]!== null) throw new Error('Position occupied');
            }
            for(let i = 0; i < shipLength; i++){
                this.grid[y+i][x]= ship;
            }
        } 

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
    getGrid = () =>{
        return this.grid;
    }
}
export{
    Gameboard
}