const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _title: String,
    _director: {
        type: mongoose.Schema.ObjectId,
        ref:'Director'
    }
});

class Movie {
    constructor(title, director){
        this._title = title;
        this._director = director;
    }

    get title(){
        return this._title;
    }

    set title(v){
        this._title = v;
    }

    get director(){
        return this._director;
    }

    set director(v){
        this._director = v;
    }
}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie', schema);