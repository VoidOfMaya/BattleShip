
//name: 'Carrier', length: 5 
//name: 'Battleship', length: 4 
//name: 'Cruiser', length: 3 
//name: 'Submarine', length: 3 
//name: 'Destroyer', length: 2 
let selectedShip = null;
const carrier =document.createElement("div");
carrier.innerHTML='Carrier';
carrier.id = 'Carrier';
carrier.className = "in-button";
carrier.addEventListener('click',()=>{
    selectedShip = carrier.id;
    console.log(`selected ship set to:${selectedShip} `)
})


const battleShip =document.createElement("div");
battleShip.innerHTML='Battleship';
battleShip.id = 'Battleship';
battleShip.className = "in-button";
battleShip.addEventListener('click',()=>{
    selectedShip = battleShip.id;
    console.log(`selected ship set to:${selectedShip} `)
})

const cruiser =document.createElement("div");
cruiser.innerHTML='Cruiser';
cruiser.id = 'Cruiser';
cruiser.className = "in-button";
cruiser.addEventListener('click',()=>{
    selectedShip = cruiser.id;
    console.log(`selected ship set to:${selectedShip} `)
})

const submarine =document.createElement("div");
submarine.innerHTML='Submarine';
submarine.id = 'Submarine';
submarine.className = "in-button";
submarine.addEventListener('click',()=>{
    selectedShip = submarine.id;
    console.log(`selected ship set to:${selectedShip} `)
})

const destroyer =document.createElement("div");
destroyer.innerHTML='Destroyer';
destroyer.id = 'Destroyer';
destroyer.className = "in-button";
destroyer.addEventListener('click',()=>{
    selectedShip = destroyer.id;
    console.log(`selected ship set to:${selectedShip} `)    
})

export {
    carrier,
    battleShip,
    cruiser,
    submarine,
    destroyer,
    selectedShip
}