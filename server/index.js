const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const path = require('path')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const login = require('./routers/login')
const seo = require('./routers/seo')
const upload = require('./routers/upload')

const app = new Koa()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT || 9000 } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  
  app.use(
    koaBody({
      multipart: true,
      formidable: {
        // 上传存放的路劲
        uploadDir: path.join(__dirname, './upload'),
        // 保持后缀名
        keepExtensions: true,
        onFileBegin: (name, file) => {
          // 获取后缀, 如: .js  .txt
          const reg = /\.[A-Za-z]+$/g
          const ext = file.name.match(reg)[0]
          //修改上传文件名
          file.path = path.join(__dirname, '/upload/') + Date.now() + ext
        },
        onError(err) {
          console.log(err)
        }
      }
    })
  )
  // 填上我们存放图片文件路径
  app.use(koaStatic(path.join(__dirname, './upload/')))

  //注册路由
  app.use(login.routes()).use(login.allowedMethods())
  app.use(seo.routes()).use(seo.allowedMethods())
  app.use(upload.routes()).use(upload.allowedMethods())

  // 监听所有路由
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
