let gameMode = null;
const view = document.createElement('div');
view.style.display = "none";
view.style.alignSelf = "center";
view.style.justifySelf = "center";
view.style.display = "grid";
view.style.height = '100%';
view.style.width = '100%';
view.style.gridTemplateColumns = "repeat(4 , 1fr)";
view.style.gridTemplateRows = "1fr 1fr";

view.style.gridTemplateAreas = `
". title title ."
". pvp pvnpc ."`

const title = document.createElement('div');
title.innerHTML = "choose game mode";
title.style.gridArea = "title";
title.style.alignSelf = "center";
title.style.justifySelf="center";

const pvp = document.createElement('div');
pvp.innerHTML = "Player vs. Player";
pvp.id = 'pvp';
pvp.style.gridArea= "pvp";
pvp.style.justifySelf = "center";
pvp.className = "in-button";


const pvnpc = document.createElement('div');
pvnpc.innerHTML = "Player vs. Computer";
pvnpc.id = 'pvnpc';
pvnpc.style.gridArea="pvnpc";
pvnpc.style.justifySelf = "center";
pvnpc.className = "in-button";



view.appendChild(title);
view.appendChild(pvp);
view.appendChild(pvnpc);



export {
    view,
    gameMode

}