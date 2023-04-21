const mongoose = require('mongoose');

//Schema
const schema = mongoose.Schema({
    _date:Date

});


//Clase

class Booking {
    constructor(date){
        this._date = date;
    }
    get date(){
        return this.date;
    }
    set date(v){
        this.date = v;
    }

}

schema.loadClass(Booking);
module.exports = mongoose.model('Booking',schema);