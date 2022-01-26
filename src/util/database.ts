import mysql from 'mysql2'

export default mysql.createPool({
    host: process.env.HOST,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
}).promise()
