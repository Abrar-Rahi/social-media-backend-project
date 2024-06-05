require('dotenv').config()

const express = require("express")
const app = express()
const router = require("./routes")

app.use(router)

const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`port is running from ${port}`)
})