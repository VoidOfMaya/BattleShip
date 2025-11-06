import { createBoard } from "./grid";

const view = document.createElement('div');
view.style.display = "none";
view.style.alignSelf = "center";
view.style.justifySelf = "center";
view.style.display = "grid";
view.style.height = '100%';
view.style.width = '100%';
view.style.gridTemplateColumns = "1fr 2fr 1fr";
view.style.gridTemplateRows = "1fr 4fr 1fr";
view.style.gridTemplateAreas = `
". title ."
". grid ."
". .  ."`

const title = document.createElement('div');
title.style.gridArea = "title";
title.innerHTML = "Damage report";
title.style.alignSelf = "center";
title.style.justifySelf = "center";
const grid = createBoard();


view.appendChild(grid);

view.appendChild(title);


export {
    view
}