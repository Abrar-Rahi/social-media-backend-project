const express = require("express")
const app = express()

app.get("/", (req,res)=>{
    res.send("home page")
})
app.get("/registration", (req,res)=>{
    res.send("registration page")
})

app.listen(8000, ()=>{
    console.log(`port is running from 8000`)
})