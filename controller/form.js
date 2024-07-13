const fs = require('fs')
const path = require('path')

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

        const path = `${year}-${month}-${day}-feedback.log`
        console.log(body.toString());
        fs.appendFile(path, body.toString()+'\n',()=>{

        })
        res.end(JSON.stringify({
            code: 200,
        }))
    })
}

module.exports = From