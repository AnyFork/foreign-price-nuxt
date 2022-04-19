import crypto from '../server/utils/crypto'
import utils from '../server/utils/cookies'
import { message } from 'ant-design-vue'

export default async function ({ route, req, redirect, isHMR }) {
  if (isHMR) return
  let isLogin, path
  //在服务端端判断是否需要登录
  if (process.server) {
    let cookies = utils.getcookiesInServer(req)
    path = req.originalUrl
    cookies = cookies.userInfo ? cookies.userInfo : ''
    //cookies解密
    isLogin = cookies ? JSON.parse(crypto.decrypt(cookies)).isLogin : false
    console.log('当前用户是否登录：', isLogin)
    //需要进行权限判断的页面开头
    if (isLogin) {
      console.log(isLogin, path)
      if (path === '/admin/login.html') {
        redirect('/admin/home/seo.html')
      }
    } else {
      if (path !== '/admin/login.html') {
        redirect('/admin/login.html')
      }
    }
  }
  //在客户端判读是否需要登陆
  if (process.client) {
    const cookies = utils.getcookiesInClient('userInfo')
    const encrypt = cookies ? crypto.decrypt(cookies) : ''
    const decrypt = encrypt ? JSON.parse(encrypt) : ''
    isLogin = decrypt ? decrypt.isLogin : ''
    console.log(cookies, encrypt, decrypt, isLogin, this)
    path = route.path
    //需要进行权限判断的页面开头
    if (isLogin) {
      console.log(isLogin, path)
      if (path === '/admin/login.html') {
        redirect('/admin/home/seo.html')
      }
    } else {
      if (path !== '/admin/login.html') {
        message.warning('登录已过期,请重新登录!', 3, () => {
          redirect('/admin/login.html')
        })
      }
    }
  }
}
