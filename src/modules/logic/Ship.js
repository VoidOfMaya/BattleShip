class Ship{
    #length;
    #damage = 0;
    #isSunk = false;
    constructor(length){
        this.#length = length;

    }
    //get
    getLength =()=>{
        return this.#length;
    };
    getDamage = ()=>{
        return this.#damage;
    };
    getIsSunk = ()=>{
        return this.#isSunk;
    };

    //set
    hit = (x)=>{
        this.#damage = this.#damage + x;
        this.#sinkShip();
    }
    #sinkShip = () =>{
        if(!this.#isSunk && this.#damage === this.#length) this.#isSunk = true;

    }

}

export{
    Ship
}