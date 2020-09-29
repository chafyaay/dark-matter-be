import expess from 'express';
import bodyParser from 'body-parser';

var csrf = require( 'csurf' );
var cookieParser = require( 'cookie-parser' );

var app = expess();


app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use( cookieParser() );


const baseApi = "/todoApp/api";
var todos: { id: number, todo: string; }[] = [];



// add todo
app.post( `${baseApi}/todo`, ( req, res ) =>
{
    todos.push( req.body );
    res.send( todos );
    console.log( todos );
} );

//-----------//
app.get( `${baseApi}/todos`, ( req, res ) =>
{
    res.send( todos );
} );

app;
//-----------//
app.delete( `${baseApi}/todo/:id`, ( req, res ) =>
{
    const id = parseInt( req.params.id );
    todos = todos.filter( item => item.id !== id );
    res.send( todos );

    console.log( id );
} );

//----------//
app.patch( `${baseApi}/todo/:id`, ( req, res ) =>
{
    const id = parseInt( req.params.id );
    const todo = req.body.todo;
    todos.map( item =>
    {
        if ( item.id == id ) item.todo = todo;
    } );

    res.send( todos );
    console.log( todos );
} );



var port = 7777;
app.listen( port, function ()
{
    console.log( `server is running on port ${port}` );
} );