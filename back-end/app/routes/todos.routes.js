module.exports = ( app ) => {
    const crud = require( '../controllers/todos.controllers.js' );

    app.post( '/api/todos', crud.createTodo );

    app.get( '/api/todos', crud.selectTodo );

    app.put( '/api/todos', crud.updateTodo );

    app.delete( '/api/todos', crud.deleteTodo );
}