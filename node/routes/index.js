const router = require('koa-router')({
  prefix: '/api'
})




router.post('/auth/register', require('../controllers/user').register)
router.post('/auth/login')


module.exports = router