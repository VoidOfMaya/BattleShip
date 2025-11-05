const body = document.body;

const container = document.createElement('div');
const playerTitle = document.createElement('dev');
playerTitle.style.gridArea = 'title';
playerTitle.innerHTML = 'Player A';
playerTitle.style.fontSize = "64px";
playerTitle.style.alignSelf = "center";
playerTitle.style.justifySelf = "center";

container.style.gridArea = 'main';

container.style.display = 'grid';
container.style.gridTemplateColumns = 'repeat(10, 1fr)';
container.style.gridTemplateRows = 'repeat(10, 1fr)';
container.style.gap = "2px";
container.style.backgroundColor = "black";

const populateBoard =()=>{
    for(let x = 0; x <10 ; x++){
        for(let y = 0; y < 10; y++){
            const cell = document.createElement('div');
            cell.setAttribute("id",`${x},${y}`);  
            cell.textContent = "  ";
            cell.classList.add('cell');
            cell.style.backgroundColor = 'white';
            cell.addEventListener('click',()=>{
                console.log(cell.id);
            })
            cell.addEventListener('mouseover',()=>{
                cell.style.backgroundColor = '#ddddddff';
            })
            cell.addEventListener('mouseout',()=>{
                cell.style.backgroundColor = 'white';
            })
            container.appendChild(cell);
        }
    }
}
populateBoard();







body.style.gridTemplateAreas= `
'. title .'
'. main .'
'. . .' `;
body.appendChild(playerTitle);
body.appendChild(container);



 export{
    body
 }