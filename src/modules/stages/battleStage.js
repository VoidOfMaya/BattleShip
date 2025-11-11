import { view , grid} from "../dom/Attack";
import { nextStage } from "../fleetSetup";

view.appendChild(nextStage);

const battle=()=>{
    console.log(grid)
}

export{
    battle
}