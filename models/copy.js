const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _number:Number,
});

class Copy {
    constructor(number){
        this._number = number;
    }
    get number(){
        return this._number;
    }
    set number(v){
        this._number = v;
    }

}

schema.loadClass(Copy);
module.exports = mongoose.model('Copy',schema);