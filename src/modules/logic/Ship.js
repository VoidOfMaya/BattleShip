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
    setDamage = (x)=>{
        this.#damage = this.#damage + x;
    }
    setIsSunk = () =>{
        (!this.#isSunk)? this.#isSunk = true : this.#isSunk = false; 
    }

}