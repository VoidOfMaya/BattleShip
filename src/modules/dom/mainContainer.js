const body = document.body;

//maincontainer
const container = document.createElement('div');
container.style.gridArea = 'main';
container.style.display = 'grid';
//container.style.gridTemplateColumns = 'repeat(10, 1fr)';
//container.style.gridTemplateRows = 'repeat(10, 1fr)';
container.style.gap = "2px";
container.style.backgroundColor = "#ddddddff";

//gametitle
const playerTitle = document.createElement('dev');
playerTitle.style.gridArea = 'title';
playerTitle.innerHTML = 'Battleship.';
playerTitle.style.fontSize = "64px";
playerTitle.style.alignSelf = "center";
playerTitle.style.justifySelf = "center";

body.style.gridTemplateAreas= `
'. title .'
'main main main'
'. . .' `;
body.appendChild(playerTitle);
body.appendChild(container);


 export{
    body,
    container,

 }