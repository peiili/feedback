const fs = require('fs')
const path = require('path')
const wechatMessage = require('./wechat-message')

const keywords = fs.readFileSync(path.join(__dirname, '..', 'keywords'), {encoding:'utf-8'})
const keywordsArray = keywords.split(/\n/g)

const From = function(req, res){
    let body = Buffer.alloc(0)
    req.on('data', (chunk)=> {
        body = Buffer.concat([body, chunk])
    })

    req.on('end', ()=> {
        var datetime = new Date()
        var year = datetime.getFullYear()
        var month = datetime.getMonth()+1
        var day = datetime.getDate()
        body = JSON.parse(body.toString())
        var notAllow = keywordsArray.some((e)=>{
            return e&&body.desc.indexOf(e)>-1
        })
        if(notAllow){
            res.end(JSON.stringify({
                code: 200,
            }))
            return 
        }
   
        const data = {
            ...body,
            time: body.time,
            ip: req.headers['x-real-ip']||''
        }
        const path = `${year}-${month}-${day}-feedback.log`
            try {
                wechatMessage(data)
            } catch (error) {
                console.error(error);
            }

        fs.appendFile(path, JSON.stringify(data)+'\n',()=>{

        })
        res.end(JSON.stringify({
            code: 200,
        }))
    })
}

module.exports = From