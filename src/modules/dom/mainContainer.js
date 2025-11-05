const body = document.body;

const container = document.createElement('div');
container.style.backgroundColor = "red";
container.style.gridArea = 'main';

body.style.gridTemplateAreas= `
'. . .'
'. main .'
'. . .' `;

body.appendChild(container);


const initGrid =(size)=>{

}

 export{
    body
 }