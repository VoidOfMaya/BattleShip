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

//state swithc button
const router = document.createElement('div');
router.innerHTML = "change view";
router.style.alignSelf = "center";
router.style.justifySelf = "center";
router.style.backgroundColor = '#ddddddff';
router.style.padding = '10px'
router.style.gridArea = 'state';



body.style.gridTemplateAreas= `
'. title .'
'main main main'
'. state .' `;
body.appendChild(playerTitle);
body.appendChild(container);
body.appendChild(router);



 export{
    body,
    container,
    router
 }