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
            var _content = content.split(/\n/g)
            var tempalte = '<!DOCTYPE html><html lang="zh-cmn-Hans"><head><meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"></head><body>'
            for (let i = 0; i < _content.length; i++) {
                try {
                    const row =JSON.parse(_content[i]);
                    tempalte+= `
                        <div class="margin-bottom: 10px; border: 1px solid #ccc">
                            <div>时间： ${row.time}</div>
                            <div>手机：${row.phone}</div>
                            <div>多选：${row.check}</div>
                            <div>详情：${row.desc}</div>
                            <div>ip：${row.ip}</div>
                            <div>
                            <img src="${row.snipaste}" style="width:50%" />
                            </div>
                        </div>
                    `
                } catch (error) {
                    continue
                }
                
            }
            res.setHeader('content-type', 'text/html;charset=UTF-8')
            res.end(tempalte+'</body></html>')
        }else {
            res.end()

        }
    } else {
        res.end()
    }
}

module.exports = Index