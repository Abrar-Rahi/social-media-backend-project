const nameValidation = (name,min,max)=>{
    if(name.length < min || name.length > max ){
        return false
    }else{
        return true
    }
}

module.exports = nameValidation