exports.mysqlDB = {
    hostname: 'localhost',
    username: 'root',
    password: '',
    database: 'vue_crud',
    dialect: 'mysql',
    tablename: 'tb_todos',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retryOptions: {
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        name: 'query',
        backoffBase: 100,
        backoffExponent: 1.1,
        timeout: 60000,
        max: Infinity
    }
};