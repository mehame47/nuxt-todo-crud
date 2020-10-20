module.exports = function( sequelize, Sequelize ){
    const Todos = sequelize.define( 'Todos', {
        todo: {
            type: Sequelize.STRING(30),
            field: 'todo',
            defaultValue: 'Nothing!',
        },
        is_completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            field: 'is_completed'
        },
        date_created: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal( "CURRENT_TIMESTAMP(3)" ),
            field: 'date_created',
        },
        date_updated: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal( "CURRENT_TIMESTAMP(3)" ),
            field: 'date_updated',
        },
        date_completed: {
            type: Sequelize.DATE(3),
            field: 'date_completed',
        }
    }, {
        hooks: {
            beforeCreate: ( todos, options ) => {
                if( todos.is_completed ) {
                    todos.is_completed = 0;
                }
            },
            beforeUpdate: ( todos, options ) => {
                const newValue = todos.dataValues;
                const oldValue = todos._previousDataValues;

                if( newValue.todo != oldValue.todo ) {
                    newValue.date_updated = sequelize.literal( "CURRENT_TIMESTAMP(3)" )
                }

                else if( newValue.is_completed != oldValue.is_completed 
                        && newValue.is_completed != 0 ) {
                    newValue.date_completed = sequelize.literal( "CURRENT_TIMESTAMP(3)" )
                }
            }
        },
        tableName: 'tb_todos',
        frezeeTableName: true,
        timestamps: false,
        updateOnDuplicate: [
            'todo',
            'is_completed',
            'date_created',
            'date_completed',
        ],
        sequelize,
    } )    

    return Todos;
}