const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieModel = require('./models/movie');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');

// 1. Nombre de la base de datos
// 2. Usuario de la base de datos
// 3. Contraseña de la base de datos
// 4. Objeto de configuracion del ORM

const sequelize = new Sequelize('video-club',
'root', '1234', {
    host:'127.0.0.1',
    dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);

// Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'movies'});
// Una pelicula puede tener un genero
Movie.belongsTo(Genre, {as:'genre'});

// Un director puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'});

// Una pelicula puede tener un director
Movie.belongsTo(Director, {as:'director'});

// Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey: 'movieId'});

// En una pelicula participan muchos actores
MovieActor.belongsTo(Actor, {foreignKey: 'actorId'});



Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});


sequelize.sync({
    force:true
}).then(()=>{
    console.log("Base de datos actualizada");
});

module.exports = { Director, Genre, Actor, Member, Movie, Booking, Copy };


