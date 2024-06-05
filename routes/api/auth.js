const express = require("express")
const router = express.Router()


router.get("/", (req,res)=>{
    console.log("api v1 auth")
})

module.exports = router