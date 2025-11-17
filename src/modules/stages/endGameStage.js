import { body, container, router } from "../dom/mainContainer";

const showEnd = async (winner)=>{
   return new Promise(resolve => {
      console.log(`the winner is: ${typeof winner}`);
      const congrats = document.createElement('div');
      if(winner === 'PlayerA'){
         congrats.innerHTML = 'Congratulations you won this round!, try your luck again? ';
      }else if(winner === "PlayerB"){
         congrats.innerHTML = ' the Computer has won this round!, but not all hope is lost! ';
      }
      congrats.style.display = 'grid';
      congrats.style.justifySelf = 'center';
      congrats.style.alignSelf = 'center';
      /*
      const button = document.createElement('div');
      button.innerHTML= "New game!";
      button.style.justifySelf = 'center';
      button.style.alignSelf = 'center';
      button.className = 'in-button';
      button.addEventListener('click',()=>{
         congrats.style.display = 'none'
         button.style.display = 'none';
         resolve(true)
      })
   */
      container.appendChild(congrats);
      container.appendChild(button);      
   })

};

export{
    showEnd,
}