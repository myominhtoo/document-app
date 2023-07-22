const mysql = require('mysql')
const {
    HOST,
    USERNAME,
    DATABASE,
    PASSWORD,
    PORT
} = require('../constants/index')

const connection = mysql.createPool({
    host: HOST,
    port: PORT,
    user: USERNAME,
    database: DATABASE,
    password: PASSWORD
})

module.exports = connection