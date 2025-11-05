import { Player } from "./logic/Player";
import { body } from "./dom/mainContainer";

const init=()=>{
    const mainPlayer = new Player();
    const aiPlayer = new Player(true);
    body

}

export {
    init,
}