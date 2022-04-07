//pm2实例配置：ecosystem.config.js
module.exports = {
  apps: [
    {
      //实例名称
      name: 'NuxtRmbRate',
      //部署模式，单机：'fork',集群：'cluster'
      exec_mode: 'fork',
      //实例数目
      instances: '1',
      //nuxt start的执行路径
      script: './node_modules/nuxt/bin/nuxt.js',
      //启动参数
      args: 'start',
      // 完整日志路径
      output: 'log/output.log',
      // 错误日志路径
      error: 'log/error.log',
      // 访问日志路径
      log: 'log/access.log',
      // 日志格式
      log_type: 'json',
      // 合并日志
      merge_logs: true,
      // 日志日期格式
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
