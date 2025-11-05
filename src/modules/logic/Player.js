import { Gameboard } from "./Gameboard"

class Player{
    #isAi =false
    constructor(enableAi){
        this.gameboard= new Gameboard();
        this.#isAi= enableAi
    }
}
export{
    Player
}