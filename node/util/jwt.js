const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

var jwtKey = "a_secret_crect"

class Jwt {
  constructor(data) {
    this.data = data
  }

  // 生产token
  generateToken() {
    let data = this.data
    // let created = Math.floor(Date.now() / 1000)
    const payload = {
      name: 'ziogie',
      data
    }
    let token = jwt.sign(payload, jwtKey, { expiresIn: '4h' });
    return token
  }

  // 校验token
  verifyToken(token) {
    
    return jwt.verify(token.split(' ')[1], jwtKey); 
  }
  
}

module.exports = Jwt