
const { v4: uuidV4 } = require('uuid');

class Band {

    constructor( name = 'no-name' ) {
        
        this.id = uuidV4(); // identificador único
        this.name  = name;
        this.votes = 1;
    }

}


module.exports = Band;