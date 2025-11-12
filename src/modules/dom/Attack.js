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
" containerA containerB "
"containerA containerB  "`

const title = document.createElement('div');
title.style.gridArea = "title";
//title.innerHTML = "coordinate attack!";
title.style.alignSelf = "center";
title.style.justifySelf = "center";

//create gridA and grid B
const {grid : gridA,cells : cellsA} = createBoard('playerA');
const {grid : gridB,cells : cellsB }= createBoard('playerB');

gridA.style.gridArea = 'gridA';
gridB.style.gridArea ='gridB';
//grid A container
const gridAContainer = document.createElement('div');
gridAContainer.style.display = 'grid';
gridAContainer.style.gridTemplateColumns = "1fr";
gridAContainer.style.gridTemplateRows = "1fr 4fr";
gridAContainer.style.gridTemplateAreas = `
"gridNameA "
" gridA "`
gridAContainer.style.gridArea = 'containerA';
// grid A name
const gridAName = document.createElement('div');
gridAName.innerHTML = gridA.id;
gridAName.style.gridArea = 'gridNameA';
gridAName.style.alignSelf = 'center';
gridAName.style.justifySelf = 'center';

gridAContainer.appendChild(gridAName)
gridAContainer.appendChild(gridA)

//grid B container
const gridBContainer = document.createElement('div');
gridBContainer.style.display = 'grid';
gridBContainer.style.gridTemplateColumns = "1fr";
gridBContainer.style.gridTemplateRows = "1fr 4fr";
gridBContainer.style.gridTemplateAreas = `
"gridNameB "
" gridB "`
gridBContainer.style.gridArea = 'containerB';
// grid b name
const gridBName = document.createElement('div');
gridBName.innerHTML = gridB.id;
gridBName.style.gridArea = 'gridNameB';
gridBName.style.alignSelf = 'center';
gridBName.style.justifySelf = 'center';

gridBContainer.appendChild(gridBName)
gridBContainer.appendChild(gridB)






view.appendChild(gridAContainer);
view.appendChild(gridBContainer);


view.appendChild(title);


export {
    view,
    gridA,
    gridB,
    title
}