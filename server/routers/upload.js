const Router = require('koa-router')
const redis = require('../utils/redis')
const fileUtils = require('../utils/file')

const router = new Router({
  prefix: '/admins'
})

//上传图片
router.post('/upload', async (ctx) => {
  const files = ctx.request.files
  const { imgType } = ctx.request.body
  if (files.file) {
    //通过正则将\\转为/
    const fileName = files.file.path.replace(/\\/g,"/").split('upload/')[1]
    const title = imgType == 1 ? 'topImg' : 'bottomImg'
    //将图片信息存入redis,以hash类型存储。
    const result = await redis.hset('imgList', title, fileName)
    if (result) {
      ctx.body = {
        code: 200,
        msg: '上传成功!',
        data: fileName
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '上传失败!'
      }
    }
  }
})

//获取列表
router.post('/imgList', async (ctx) => {
  const result = await new Promise((resolve, reject) => {
    redis.hgetall('imgList', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }).catch((err) => {
    console.log(code + '图片列表数据发生错误：', err)
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
//新增链接
router.post('/link', async (ctx) => {
  const { topLink, bottomLink } = ctx.request.body
  //将图片信息存入redis,以hash类型存储。
  const result = await redis.hmset('imgList', 'topLink', topLink, 'bottomLink', bottomLink)
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

//删除图片
router.post('/remove', async (ctx) => {
  const { name, imgType } = ctx.request.body
  const title = imgType == 1 ? 'topImg' : 'bottomImg'
  //删除本地图片
  fileUtils(name)
  //删除redis中的图片。
  const result = await redis.hset('imgList', title, '')
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

module.exports = router
