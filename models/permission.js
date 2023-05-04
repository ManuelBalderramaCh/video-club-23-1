const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _description: String,
    _permissionType: {
        type: String,
        enum: ['CREATE', 'READ', 'UPDATE', 'DELETE']
    }
})

class Permission {

    constructor(description, permisisonsType) {
        this._description = description;
        this._permissionType = permisisonsType;
    }

    get description() {
        return this._description;
    }
    set description(v) {
        this._description = v;
    }

    get permisisonsType() {
        return this._permissionType;
    }
    set permisisonsType(v) {
        this._permissionType = v;
    }
    

}

schema.loadClass(Permission);
module.exports = mongoose.model('Permission', schema);
