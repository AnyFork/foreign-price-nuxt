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
      //执行的脚本文件
      script: 'server/index.js',
      //应用程序所在的目录
      cwd: '',
      // 传递给脚本的参数
      args: '',
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
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // 最小运行时间，这里设置的是60s即如果应用程序在* 60s内退出，pm2会认为程序异常退出，此时触发重启* max_restarts设置数量，应用运行少于时间被认为是异常启动
      min_uptime: '60s',
      // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）,最大异常重启次数，即小于min_uptime运行时间重启次数；
      max_restarts: 10,
      // 启用/禁用应用程序崩溃或退出时自动重启，默认为true, 发生异常的情况下自动重启
      autorestart: true,
      // 异常重启情况下，延时重启时间
      restart_delay: 30,
      //生产环境配置
      env_prod: {
        // 环境参数，当前指定为生产环境 process.env.NODE_ENV
        NODE_ENV: 'production'
      }
    }
  ]
}
