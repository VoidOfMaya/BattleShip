class Ship{
    #length = 0;
    #damage = 0;
    #positions =[];

    #isSunk = false;
    constructor(length, name){
        this.#length = length;
        this.name = name;

    }
    //get
    getLength = () =>{
        return this.#length;
    };
    getDamage = () =>{
        return this.#damage;
    };
    getIsSunk = () =>{
        return this.#isSunk;
    };
    getPositions(){
        return this.#positions;
    };

    //set
    setPosition(pos){
        this.#positions.push(pos);
        
    };
    resetPositions(){
        this.#positions = [];
    }
    hit = (x) =>{
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