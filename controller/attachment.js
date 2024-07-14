const fs = require('fs')
const path = require('path')

const Index = function(req, res){
    const url = req.url.replace('/feedback/', '')
    const pagePath = path.join(__dirname, '..' ,url)
    const isExit = fs.existsSync(pagePath)
    if(isExit){
        const page = fs.readFileSync(pagePath)
        res.end(page)
        return 
    }
    res.end()
}

module.exports = Index