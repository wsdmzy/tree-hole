const {User} = require('../model/user')

async function login() {

}

async function register(ctx) {
  const { username, telphone, password } = ctx.request.body
  console.log(username,telphone,password)
  User.insertMany()
}

module.exports = {
  login,
  register
}