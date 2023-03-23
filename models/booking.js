module.exports = (sequelize,type) => {
    const Booking = sequelize.define('bookings',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        date: 'TIMESTAMP'
    });
    return Booking;
};