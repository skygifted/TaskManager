const mysql = require('mysql')


const Db = mysql.createConnection({

      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DB_NAME,
      password: process.env.PASSWOARD      
})

module.exports = Db