const fs = require('fs')
const path = require('path')
const deleteFolderRecursive = (name) => {
  const url = path.join(__dirname, '../upload')
  console.log(url)
  var files = []
  if (fs.existsSync(url)) {
    //判断给定的路径是否存在,返回文件和子目录的数组
    files = fs.readdirSync(url)
    files.forEach(function (file, index) {
      const curPath = path.join(url, file)
      console.log('当前路径：', curPath)
      if (fs.statSync(curPath).isDirectory()) {
        //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteFile(curPath, name)
      } else {
        if (file.indexOf(name) > -1) {
          //是指定文件，则删除
          fs.unlinkSync(curPath)
          console.log('删除文件：' + curPath)
        }
      }
    })
  } else {
    console.log('给定的路径不存在！')
  }
}

module.exports = deleteFolderRecursive
