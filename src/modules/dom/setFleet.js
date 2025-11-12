import { createBoard } from "./grid";
import { carrier, battleShip, cruiser, submarine, destroyer, direction } from "./fleetSelect";

const view = document.createElement('div');
view.style.display = "none";

const fleetCont = document.createElement('div');
fleetCont.style.gridArea = 'choices';
fleetCont.style.alignContent = "center";
fleetCont.style.justifyContent = "center";

view.style.alignSelf = "center";
view.style.justifySelf = "center";
view.style.display = "grid";
view.style.height = '100%';
view.style.width = '100%';
view.style.gridTemplateColumns = "1fr 2fr 1fr";
view.style.gridTemplateRows = "1fr 4fr 1fr";

view.style.gridTemplateAreas = `
". title ."
"choices gridA ."
". next  ."`

const title = document.createElement('div');
title.style.gridArea = "title";
title.innerHTML = "position your fleet";
title.style.alignSelf = "center";
title.style.justifySelf = "center";
const {grid, cells} = createBoard('playerA');
grid.style.gridArea= "gridA";

view.appendChild(fleetCont);
view.appendChild(grid);
view.appendChild(title);


fleetCont.appendChild(carrier);
fleetCont.appendChild(battleShip);
fleetCont.appendChild(cruiser);
fleetCont.appendChild(submarine);
fleetCont.appendChild(destroyer);
fleetCont.appendChild(direction);

export {
    view,
    grid
}