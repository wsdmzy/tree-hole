const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const conf = require('./config/config')

require('./config/db')

app.use(bodyParser())

app.use(require('./routes/index').routes())



app.listen(conf.port,() => {
  console.log(`服务在${conf.port}端口启动成功`)
})


