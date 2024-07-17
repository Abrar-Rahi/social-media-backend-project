const genarateCode = (length)=>{
    let code = ""
    let schema = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"

    for(let i = 0; i < length; i++){
        code += schema.charAt(Math.floor(Math.random() * schema.length))
    }
    return code
    
}

module.exports = genarateCode