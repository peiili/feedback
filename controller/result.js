const fs = require('fs')
const path = require('path')

const pagePath = path.join(__dirname, '..' ,'template/result.html')
const page = fs.readFileSync(pagePath, {encoding:'utf-8'})

const Index = function(req, res){
    res.end(page)
}

module.exports = Index