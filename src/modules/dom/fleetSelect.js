
//name: 'Carrier', length: 5 
//name: 'Battleship', length: 4 
//name: 'Cruiser', length: 3 
//name: 'Submarine', length: 3 
//name: 'Destroyer', length: 2 
let selectedShip = null;
let orientation = "horizontal";
const carrier =document.createElement("div");
carrier.innerHTML='Carrier';
carrier.id = 'Carrier';
carrier.className = "in-button";
carrier.classList.add('ship-btn');
carrier.addEventListener('click',()=>{
    selectedShip = carrier.id;
    console.log(`selected ship set to:${selectedShip} `)
})


const battleShip =document.createElement("div");
battleShip.innerHTML='Battleship';
battleShip.id = 'Battleship';
battleShip.className = "in-button";
battleShip.classList.add('ship-btn');
battleShip.addEventListener('click',()=>{
    selectedShip = battleShip.id;
    console.log(`selected ship set to:${selectedShip} `)
})

const cruiser =document.createElement("div");
cruiser.innerHTML='Cruiser';
cruiser.id = 'Cruiser';
cruiser.className = "in-button";
cruiser.classList.add('ship-btn');
cruiser.addEventListener('click',()=>{
    selectedShip = cruiser.id;
    console.log(`selected ship set to:${selectedShip} `)
})

const submarine =document.createElement("div");
submarine.innerHTML='Submarine';
submarine.id = 'Submarine';
submarine.className = "in-button";
submarine.classList.add('ship-btn');
submarine.addEventListener('click',()=>{
    selectedShip = submarine.id;
    console.log(`selected ship set to:${selectedShip} `)
})

const destroyer =document.createElement("div");
destroyer.innerHTML='Destroyer';
destroyer.id = 'Destroyer';
destroyer.className = "in-button";
destroyer.classList.add('ship-btn');
destroyer.addEventListener('click',()=>{
    selectedShip = destroyer.id;
    console.log(`selected ship set to:${selectedShip} `)    
})
const direction = document.createElement("div");
direction.className = "in-button";
direction.style.backgroundColor = "#ff8383ff";
direction.innerHTML = orientation;
direction.addEventListener("click",()=>{
    if(orientation === "horizontal"){
        orientation = "vertical";   
        direction.style.backgroundColor = "#99ec8fff"; 
    }else{
        orientation = "horizontal";
        direction.style.backgroundColor = "#ff8383ff";
    }
    direction.innerHTML = orientation
})


export {
    carrier,
    battleShip,
    cruiser,
    submarine,
    destroyer,
    selectedShip,
    direction,
    orientation
}