const Sequelize = require('sequelize');

// const todos = require( './todos.model.js' );
const db_config = require( '../config/database.config.js' );

const { 
    hostname, username, password, database,
    dialect, pool, retryOptions
} = db_config.mysqlDB;

const sequelize = new Sequelize( database, username, password, {
    host: hostname,
    dialect: dialect,
    pool: pool,
    retry: retryOptions,
});

sequelize.authenticate().then( () => {
    console.log( 'connection to database was established')
}).catch( ( error ) => {
    console.log( 'something was error', error.message )
})

const model = {};

model.Sequelize = Sequelize;
model.sequelize = sequelize;

model.todos = require( './todos.model' )( sequelize, Sequelize );

module.exports = model;