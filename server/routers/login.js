const Router = require('koa-router')
const crypto = require('../utils/crypto')

const router = new Router({
  prefix: '/admins'
})

//内置超级管理员账号密码
const admin = {
  userName: 'admin',
  userPassword: 'admin',
  isLogin: false
}

//用户登录
router.post('/login', async (ctx) => {
  const { userName, userPassword } = ctx.request.body
  if (userName == admin.userName && userPassword == admin.userPassword) {
    admin.isLogin = true
    //将登录信息成功信息存入cookie中，设置过期1个小时,注意cookie由服务器产生，过期时间按照服务器时间进行设置。
    ctx.cookies.set('userInfo', crypto.encrypt(JSON.stringify(admin)), {
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      httpOnly: false
    })
    ctx.body = {
      code: 200,
      msg: '登录成功!'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '账号或密码错误!'
    }
  }
})

module.exports = router
