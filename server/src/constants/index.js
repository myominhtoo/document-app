const dotenv = require('dotenv')

dotenv.config()

const USERNAME = process.env.USER
const DATABASE = process.env.DATABASE
const PASSWORD = process.env.PASSWORD
const HOST = process.env.MYSQL_HOST
const PORT = process.env.PORT

const SOCKET_PORT = 3001
const CLIENTS = [
    'http://localhost:5173',
    'http://localhost:3000'
]

const ALLOWED_METHODS = [
    'GET',
    'POST'
]

const EVENTS = {
    CONNECTION: 'connection',
    MESSAGE: 'message',
    SAVE_CHANGES: 'save-changes',
    EMIT_CHANGES: 'emit-changes',
    GET_DOCUMENT: 'get-document',
    LOAD_DOCUMENT: 'load-document',
    SAVE_DOCUMENT: 'save-document'
}

const QUERIES = {
    DOCUMENT: {
        findById: `select * from docs where id = ?`,
        save: `insert into docs (id) values (?)`,
        update: `update docs set data = ? where id = ?`
    }
}

module.exports = {
    SOCKET_PORT,
    EVENTS,
    CLIENTS,
    ALLOWED_METHODS,
    USERNAME,
    DATABASE,
    PASSWORD,
    HOST,
    QUERIES,
    PORT
}