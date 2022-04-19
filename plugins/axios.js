export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const showapi_appid = 79245
    const showapi_timestamp = new Date().getTime()
    const showapi_sign = '3e27cbfff34e4bc1b84c74af6d44d2ab'
    //判断是否设置超时时间,默认5秒
    config.timeout = config.timeout === 0 ? 5000 : config.timeout
    //设置请求参数
    if (config.url.indexOf('/admins') == -1) {
      if (config.url.indexOf('?') == -1) {
        config.url = config.url + '?showapi_appid=' + showapi_appid + '&showapi_timestamp=' + showapi_timestamp + '&showapi_sign=' + showapi_sign
      } else {
        config.url = config.url + '&showapi_appid=' + showapi_appid + '&showapi_timestamp=' + showapi_timestamp + '&showapi_sign=' + showapi_sign
      }
    }
  })
  $axios.onResponse((response) => {})
  $axios.onRequestError((error) => {
    console.log(error)
  })

  $axios.onResponseError((error) => {
    console.log(error)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
