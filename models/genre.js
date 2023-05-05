const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _description:String
})

class Genre {
    constructor(description){
        this._description = description;
    }

    get description(){
        return this._name;
    }

    set description(v){
        this._description = v;
    }
}

Schema.loadClass(Genre);
module.exports = mongoose.model('Genre', Schema);