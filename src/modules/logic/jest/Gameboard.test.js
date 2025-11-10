import { Gameboard } from "../Gameboard";
import { Ship } from "../Ship";

const board = new Gameboard(10);
const wantedOutput = Array.from({ length: 10 }, () => Array(10).fill(null));
it('initializes gameboard',()=>{
    expect(board.grid).toEqual(wantedOutput);
        
})
it('places a ship of a length on the gameboard',()=>{
    wantedOutput[5][5]= "ship";
    expect(board.populateGrid([5,5], 3)).not.toBeNull()
})
it('places a ship out of bounds on the x',()=>{

    expect(()=>{board.populateGrid([5,11], 3)}).toThrow('Ship out of bound!');

    expect(()=>{board.populateGrid([11,5], 3)}).toThrow('Ship out of bound!');
})
it('handles recieving attack on gameboard',()=>{
    board.recieveAttack([5, 3]);
    expect(board.grid[5][3]).toBeFalsy();

    board.recieveAttack([5,5]);
    expect(board.grid[5][5].getDamage()).toEqual(1);
})
//it('handles ships sunk',()=>{

    //expect(board.allShipsSunk()).toBeFalsy();
    //board.recieveAttack([5,5]);
    //board.recieveAttack([5,5]);
    //expect(board.allShipsSunk()).toBeTruthy();


//})
//run rmove test
it("places a ship on the gameboard", () => {
    board.populateGrid([2, 2], 3, "Destroyer");

    expect(board.grid[2][2]).toEqual("Destroyer" );
    expect(board.grid[3][2].getName()).toEqual("Destroyer");
    expect(board.grid[4][2].getName()).toEqual("Destroyer");
});
it("removes a ship from the gameboard", () => {
    board.populateGrid([2, 2], 3, "Destroyer", "horizontal");

    // Ensure it's placed
    expect(board.grid[2][2]).toBeTruthy();

    // Remove it
    board.removeShip("Destroyer");

    // All occupied cells should now be null
    expect(board.grid[2][2]).toBeNull();
    expect(board.grid[3][2]).toBeNull();
    expect(board.grid[4][2]).toBeNull();
});

