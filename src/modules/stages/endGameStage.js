import { body, container, router } from "../dom/mainContainer";

const showEnd = async (winner)=>{
   return new Promise(resolve => {
      console.log(`the winner is: ${typeof winner}`);
      const congrats = document.createElement('div');
      if(winner === 'PlayerA'){
         congrats.innerHTML = 'Congratulations you won this round!';
      }else if(winner === "PlayerB"){
         congrats.innerHTML = 'You died!';
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
      
   })

};

export{
    showEnd,
}