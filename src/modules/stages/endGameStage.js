import { body, container, router } from "../dom/mainContainer";

const showEnd = async (winner)=>{
 console.log(`the winner is: ${winner}`);
 const congrats = document.createElement('div');
 if(winner === 'playerA'){
    congrats.innerHTML = 'Congratulations you won this round!, try your luck again? ';
 }else if(winner === "playerB"){
    congrats.innerHTML = ' the Computer has won this round!, but not all hope is lost! ';
 }
 congrats.style.display = 'grid';

 const button = document.createElement('div');
 button.innerHTML= "Play an other round"
 container.appendChild(congrats);
};

export{
    showEnd,
}