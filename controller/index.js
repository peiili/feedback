const fs = require('fs')
const path = require('path')

var pagePath = path.join(__dirname, '..' ,'template/index.html')
var page = fs.readFileSync(pagePath, {encoding:'utf-8'})

const Index = function(req, res){
    var cookies = req.cookies
    // if(obj.tmp_user) {
    //     res.setHeader('content-type', 'text/html; charset=UTF-8')
    //     res.end('<h1>正在处理</h1>')
    //     return
    // }
    if(cookies.tmp_user){
        res.setHeader('content-type', 'text/html; charset=UTF-8')
        // res.end('<h1>已处理</h1>')
         res.end(page)
    } else {
      // 第一次进入
      var etag = new Date().getTime()
      res.setHeader('Set-Cookie', ['tmp_user='+ etag +'; HttpOnly; Path=/']);
      res.end(page)
    }
}

module.exports = Index