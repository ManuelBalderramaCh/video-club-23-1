
module.exports = (sequelize, type) => {
    const Member = sequelize.define('members', {
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        name: type.STRING,
        lastName: type.STRING,
        address: type.STRING,
        phone: type.INTEGER,
        status: type.INTEGER
    });
    return Member;
};