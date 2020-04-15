const router = require('koa-router')({
  prefix: '/api'
})

const auth = require('../middlewares/auth')



router.post('/auth/register', require('../controllers/user').register)
router.post('/auth/login',require('../controllers/user').login)
router.get('/auth/info',auth, require('../controllers/user').userInfo)


module.exports = router