const http = require('http')

const index = require('./controller/index')
const result = require('./controller/result')
const form = require('./controller/form')
const list = require('./controller/list')

const serve = http.createServer((req, res)=>{
    const method = req.method.toLocaleLowerCase()
    console.log(req.url);
    if(method==='post'){
        if(req.url==='/feedback/form'){
            form(req, res)  
        }
    } else if(method==='get'){
        if(req.url==='/feedback') {
            index(req, res)
        } else if(req.url==='/feedback/result') {
            result(req, res)
        } else if(req.url==='/feedback/list') {
            list(req, res)
        }
    }

})

serve.listen(4333, ()=>{
    console.log('you app run 4333');
})