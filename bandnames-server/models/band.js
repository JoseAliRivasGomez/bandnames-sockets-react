const {v4: uuidv4} = require('uuid');

class Band {

    constructor(name){
        this.id = uuidv4();
        this.name = name;
        this.votes = Math.floor(Math.random() * 1000) + 1;
    }

}

module.exports = Band;