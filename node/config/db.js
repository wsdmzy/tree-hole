const mongoose = require('mongoose')
const conf = require('./config')
mongoose.set('useCreateIndex', true)   //建立索引

mongoose.connect(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
  console.log("数据库连接成功！")
})

db.on('error', (err) => {
  console.error("Error in MongoDb connection:" + err)
  mongoose.disconnect()
})

module.exports = db