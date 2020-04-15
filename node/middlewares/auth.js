module.exports = async (ctx,next) => {
  if (ctx.headers.authorization) {
    // console.log('++')
    await next()
  } else {
    ctx.response.status = 401
    ctx.response.body = {
      msg: "权限不足"
    }
    return
  }
}