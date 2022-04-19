const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')

client.on('error', function (err) {
  console.log(err)
})

client.on('connect', function () {
  console.log('redis connect success!')
})

module.exports = client
