import { Ship } from "../Ship";
//test isSunk public methods

const ship = new Ship(5);
it('returns true on first run',()=>{
 
    expect(ship.getIsSunk()).toBeFalsy();
})
it('returns true on first run',()=>{

    ship.hit(3);
    expect(ship.getIsSunk()).toBeFalsy();
})
it('returns true on first run',()=>{
    ship.hit(2);
    expect(ship.getIsSunk()).toBeTruthy();
})
