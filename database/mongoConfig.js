const mongoose = require("mongoose")

let mongoConfig = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("database connected");
    })
}

module.exports = mongoConfig