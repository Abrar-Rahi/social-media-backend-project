var jwt = require('jsonwebtoken');

const jwToken = (userId,expair)=>{
  return jwt.sign(userId, process.env.TOKEN, {expiresIn: expair})
}

module.exports = jwToken