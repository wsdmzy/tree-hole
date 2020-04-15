const {User} = require('../model/user')
const bcrypt = require('bcrypt')
const Jwt = require('../util/jwt')

async function login(ctx) {
  const { telephone, password } = ctx.request.body
  let data = await User.find({telephone})
  if (data.length === 0) {
    ctx.status = 400
    ctx.body = {
     msg: "手机号错误"
    }
    return
  }
  let flag = await bcrypt.compareSync(password,data[0].password)
  if (flag) {
    let jwt = new Jwt(telephone)
    let token = jwt.generateToken()
    ctx.status = 200
    ctx.body = {
     msg: "登陆成功",
     token
    }
  } else {
    ctx.status = 400
    ctx.body = {
     msg: "密码错误"
    }
  }
}

async function register(ctx) {
  const { username, telephone, password } = ctx.request.body
  let data = await User.find({telephone})
  if (data.length) {
    ctx.status = 422
    ctx.body = {
     msg: "该手机号已被注册"
    }
    return
  }

  const saltRounds = 10  //随机数
  const salt = bcrypt.genSaltSync(saltRounds)  //生成盐
  const hash = bcrypt.hashSync(password, salt)//加密后的hash
  
  let flag = await User.insertMany({
    username,
    telephone,
    password: hash
  })
  // console.log(flag)
  if (flag.length > 0) { 
    let jwt = new Jwt(telephone)
    let token = jwt.generateToken()
    ctx.status = 200
    ctx.body = {
     msg: "注册成功",
     token
    }
  } else {
    ctx.status = 500
    ctx.body = {
     msg: "注册失败"
    }
  }
}

async function userInfo(ctx) { 
  try {
    let jwt = new Jwt()
    let payload = jwt.verifyToken(ctx.headers.authorization)
    // console.log(payload)
    let data = await User.find({"telephone": payload.data})
    // console.log(data)
    ctx.body = {
     user: {
      username: data[0].username,
      telephone: data[0].telephone
     }
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
     msg: error.message
    }
  }
 
}

module.exports = {
  login,
  register,
  userInfo
}