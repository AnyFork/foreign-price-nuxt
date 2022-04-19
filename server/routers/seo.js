const Router = require('koa-router')
const redis = require('../utils/redis')

const router = new Router({
  prefix: '/admins'
})

//新增seo
router.post('/seoAdd', async (ctx) => {
  const { title, keywords, description, code } = ctx.request.body
  //将数据存入redis,以hash类型存储。
  const result = await redis.hmset(code, 'title', title, 'keywords', keywords, 'description', description)
  if (result) {
    ctx.body = {
      code: 200,
      msg: '操作成功!'
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '操作失败!'
    }
  }
})

//seo列表
router.post('/seoInfo', async (ctx) => {
  const { code } = ctx.request.body
  const result = await new Promise((resolve, reject) => {
    redis.hgetall(code, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }).catch((err) => {
    console.log(code + '银行seo列表数据发生错误：', err)
    ctx.body = {
      code: 500,
      msg: '操作失败!',
      data: {}
    }
  })
  ctx.body = {
    code: 200,
    msg: '操作成功!',
    data: result || {}
  }
})

module.exports = router
