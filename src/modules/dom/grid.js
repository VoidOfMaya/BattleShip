
const createBoard =(boardId)=>{
    const grid = document.createElement('div');
    grid.style.width = "500px";
    grid.style.height = "500px"

    grid.style.display = "grid";
    grid.id =boardId;
    grid.style.gap = "2px";
    grid.style.padding = "2px"
    grid.style.backgroundColor= "#b1cac9ff";
    grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    grid.style.gridTemplateRows = 'repeat(10, 1fr)';
    const cells = [];
    for(let x = 0; x <10 ; x++){
        for(let y = 0; y < 10; y++){
            const cell = document.createElement('div');
            cell.setAttribute("id",`${y},${x}`);  
            cell.textContent = "  ";
            cell.classList.add('cell');
            cell.style.backgroundColor = 'white';

            cell.dataset.x = x;
            cell.dataset.y = y;
            cells.push(cell);
            grid.appendChild(cell);
        }
    }
    return {grid, cells};
}

export{
    createBoard,
}