import { createBoard } from "./grid";
const view = document.createElement('div');
view.style.display = "none";
view.style.alignSelf = "center";
view.style.justifySelf = "center";
view.style.display = "grid";
view.style.height = '100%';
view.style.width = '100%';
view.style.gridTemplateColumns = "1fr  1fr";
view.style.gridTemplateRows = "1fr 4fr 1fr";
view.style.gridTemplateAreas = `
"title   title "
" gridA gridB "
". .  "`

const title = document.createElement('div');
title.style.gridArea = "title";
title.innerHTML = "coordinate attack!";
title.style.alignSelf = "center";
title.style.justifySelf = "center";
const {grid : gridA,cells : cellsA} = createBoard('playerA');
const {grid : gridB,cells : cellsB }= createBoard('playerB');
gridA.style.gridArea = 'gridA';
gridB.style.gridArea ='gridB';
view.appendChild(gridA);
view.appendChild(gridB);


view.appendChild(title);


export {
    view,
    gridA,
    gridB,
}