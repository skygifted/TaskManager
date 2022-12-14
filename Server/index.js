const express = require('express')
const cors  = require('cors')
const BodyParser = require('body-parser')
const session = require('express-session')
require("dotenv").config()
const Employee = require('./employee/employee')
const Admin = require('./admin/admin')
const Supervisor = require('./supervisor/supervisor')
const Db = require('./DataBase/DbConnection')

const app = express()

const Port = 5000 || process.env.PORT

// Added cors middleware to psot intersect
app.use(cors(

    {
        origin: ["http://localhost:3000","http://localhost:3001"],
        credentials: true
    }

))

// Added Json middleware for Stringfying Texts
app.use(express.json())

// Added BodyParser for passing data
app.use(BodyParser.json({limit: '10mb'}))
app.use(BodyParser.urlencoded({extended: true}))

// Set Session

app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
})
)


// Get all the Admin path through the main API
app.use('/admin',Admin)


// Get all the Supervisor path through the main API
app.use('/supervisor',Supervisor)


// Get all Employee path through the main API
app.use('/employee',Employee)

// Constant check for Database if is working or Not
Db.connect((err) =>{
   
    if(err) console.log(err)

     console.log('DataBase is connected')
})





app.listen(Port,() => console.log(`Server is runing at Port ${Port}`))