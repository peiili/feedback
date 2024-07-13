const fs = require('fs')
const Index = function(req, res){
    var datetime = new Date()
    var year = datetime.getFullYear()
    var month = datetime.getMonth()+1
    var day = datetime.getDate()
    const path = `${year}-${month}-${day}-feedback.log`
    const state = fs.existsSync(path)
    if(state){
        const content = fs.readFileSync(path, { encoding: 'utf-8' })
        if(content.length>0){
            var _content = content.split('/\n/g')
            console.log(_content);
        }
    } else {
        res.end()
    }
}

module.exports = Index