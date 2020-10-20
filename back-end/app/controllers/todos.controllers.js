const model = require( '../models/index.js' )
const Todos = model.todos;

async function findTodo( comparison, all = false ){
    let findTodo;

    if( all ){
        findTodo = await Todos.findAll( {} );
    }

    else {
        findTodo = await Todos.findAll({
            where: comparison
        })
    }

    if( findTodo.length == 0 ) {
        return false
    }

    return findTodo
}

const checkResult = function( res, result, action, status_code ){    
    if( result.length == 0 || !( result ) ) {
        const messageFailed = `cannot ${action}`
        return handleFailed( res, messageFailed, action, result )
    }

    const msgSuccess = `${action} has been success`

    console.log( msgSuccess );
    return res.status( 200 ).send({
        status_code: res.statusCode,
        accepted_action: msgSuccess,
        data: result
    })
}

const handleFailed = function( res, failure, action ) {
    console.log( failure );
    return res.status( 404 ).send( {
        status_code: res.statusCode,
        reject_action: `${action} has been rejected`,
        message: failure,
    } )
}

const isEmptyObject = function( obj ){
    return Object.keys( obj ).length == 0;
}

const getValueObj = function( obj ){
    return Object.values( obj );
}

const getKeyObj = function( obj ){
    return Object.keys( obj );
}

const toString = function( arr ){
    return arr.toString();
}

exports.createTodo = async ( req, res ) => {
    try {
        const action = 'create todo'
        let { todo } = req.body;

        if( todo ){
            await Todos.create( req.body )
            const findNewTodo = await findTodo( 
                {
                    id: await Todos.max( 'id' )
                } 
            );

            checkResult( res, findNewTodo, action );
        }

        else {
            handleFailed( res, "body todo must not empty", action)
        }

    } catch ( error ) {
        handleFailed( res, error.message, 'create todo' );
    }
}

exports.selectTodo = async ( req, res ) => {
    try {
        const reqQuery = req.query;
        const action = "select todo"

        if( !(isEmptyObject( reqQuery )) ) {
            const accKeys = ['id'];
            const reqKeyString = toString( getKeyObj( reqQuery ) );
            const id = toString( getValueObj( reqQuery ) );

            if( accKeys.includes( reqKeyString ) ) {
                let findingTodo;

                if( reqKeyString == 'id' ){
                    findingTodo = await findTodo( reqQuery );
                }

                checkResult( res, findingTodo, action )
            }

            else {
                const message = `cannot find todo by ${reqKeyString}`
                handleFailed( res, message, action );
            }
        }

        else {
            const selectAll = await findTodo( null, true );

            checkResult( res, selectAll, "find all todo" );
        }

    } catch ( error ) {
        handleFailed( res, error.message, 'select todo' );
    }    
}

exports.updateTodo = async function( req, res ) {
    try {
        const reqBody = req.body
        const reqQuery = req.query
        const action = 'update todo'

        const reqValueString = toString( getValueObj( reqQuery ) );

        const findingTodo = await findTodo( reqQuery );

        if( findingTodo ){
            await Todos.update( reqBody, 
                {
                    where: {
                        id: reqValueString
                    },
                    individualHooks: true
                }
            )

            const findingTodo = await findTodo( reqQuery );
            
            checkResult( res, findingTodo, action );
        }

        else {
            checkResult( res, findingTodo, `find todo with id ${id}` );
        }

    } catch ( error ) {
        handleFailed( res, error.message, `update todo` );
    }
}

exports.deleteTodo = async function( req, res ){
    try {
        const reqQuery = req.query
        const action = `delete todo`
        const reqKeyString = toString( getKeyObj(reqQuery) );

        if( !(isEmptyObject( reqQuery )) && reqKeyString == 'id' ) {
            const id = toString( getValueObj( reqQuery ) );
            const findingTodo = await findTodo( reqQuery );

            if( findingTodo ){
                await Todos.destroy({
                    where: {
                        id: id
                    }
                })

                const selectAll = await Todos.findAll({});

                return res.status(200).send({
                    status_code: res.statusCode,
                    message: `succesfully ${action}`,
                    data: selectAll
                })
            }
            else {
                checkResult( res, findingTodo, `find todo with id ${id}` )
            }
        }

        else {
            handleFailed( res, `failed get query with ${reqKeyString}`, action );
        }
    } catch ( error ) {
        handleFailed( res, error.message, 'delete todo' )
    }
}