const fs = require('fs')
const Index = function(req, res){
    var datetime = req.query.date
    if(datetime){
        datetime = new Date(datetime)
    }else {
        datetime = new Date()
    }
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
                            +' <input type="date" name="datetime" style="margin: 10px;padding:10px">'
            for (let i = 0; i < _content.length; i++) {
                try {
                    const row =JSON.parse(_content[i]);
                    tempalte+= `
                        <div style="margin-bottom: 10px; border: 1px solid #ccc;padding: 10px">
                            <div> <b> 时间：</b>  ${row.time}</div>
                            <div> <b> 手机：</b> ${row.phone}</div>
                            <div> <b> 多选：</b> ${row.check}</div>
                            <div> <b> 详情：</b> ${row.desc}</div>
                            <div> <b> ip：</b> ${row.ip}</div>
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
            /* javascript */
            tempalte+= `
                <script>
                var datetime = document.querySelector('[name="datetime"]');
                datetime.addEventListener('change',function(e){
                    location.href = '/feedback/list?date=' + e.target.value
                })
                </script>
            `
            res.end(tempalte+'</body></html>')
        }else {
            res.end()

        }
    } else {
        res.end()
    }
}

module.exports = Index

