require('dotenv').config()

const express = require("express")
const cors = require("cors")
const mongoConfig = require("./database/mongoConfig")
const router = require("./routes")

//database connections
mongoConfig()
// express middleware connections
const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`port is running from ${port}`)
})