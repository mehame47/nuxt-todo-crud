const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );
const { sequelize } = require( './app/models/index.js' );

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200
}

sequelize.sync().then( () => {
    console.log( 'sync table if not exist' )
})

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() )
app.use( morgan('dev') );
app.use( cors( corsOptions ) );

app.get( '/', ( req, res ) => {
    res.json( { 
        message: "you're connected"
    } )
} );

require( './app/routes/todos.routes.js' )( app );

const port = process.env.PORT || 8081;

app.listen( port, () => {
    console.log( `listening on port ${port}` )
} )