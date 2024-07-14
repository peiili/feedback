const fs = require('fs')
const path = require('path')

const isExit = fs.existsSync(path.join(__dirname, '..', 'attachment'))
if(!isExit){
    fs.mkdir(path.join(__dirname, '..', 'attachment'), ()=>{})
}
console.log(isExit);
const Index = function(req, res){
    const name = req.query.name
    let body = Buffer.alloc(0)
    req.on('data', (chunk)=> {
        body = Buffer.concat([body, chunk])
    })

    req.on('end', ()=> {
        const pathname = path.join(__dirname, '..', 'attachment', name)
        fs.writeFileSync(pathname, body)
        res.end( JSON.stringify({
            code: 200,
            data: path.join('/feedback/attachment', name)
        }))
    })
}

module.exports = Index