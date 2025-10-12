const http = require('http')
const querystring = require('querystring')

const index = require('./controller/index')
const result = require('./controller/result')
const form = require('./controller/form')
const list = require('./controller/list')
const upload = require('./controller/upload')
const attachment = require('./controller/attachment')

function queryCookies(req){
    const cookie = req.headers.cookie
    var obj = {}
    if(cookie) {
        const item = cookie.split(';')
        item.forEach(e => {
            var key = e.split('=')[0].trim()
            var value = e.split('=')[1].trim()
            obj[key] = value
        });
    }
    req.cookies = obj;
}
const serve = http.createServer((req, res)=>{

    const method = req.method.toLocaleLowerCase()
    const query = querystring.parse(req.url.split('?')[1])
    req.query = query;

    queryCookies(req, res);
    if(method==='post'){
        if(req.url==='/feedback/form'){
            form(req, res)
        } else if(/\/feedback\/upload*./.test(req.url)){
            upload(req, res)
        }
    } else if(method==='get'){
        if(/^\/feedback\?sn_id=.*$/.test(req.url)) {
            index(req, res)
        } else if(req.url==='/feedback/result') {
            result(req, res)
        } else if(/\/feedback\/list\/*/.test(req.url)) {
            list(req, res)
        } else if(/\/feedback\/attachment\/*/.test(req.url)) {
            attachment(req, res)
        }
    }

})

serve.listen(4333, ()=>{
    console.log('you app run 4333');
})