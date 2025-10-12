const fs = require('fs')

function getTargetValue(urlString) {
    try {
        const url = new URL(urlString);
        const snId = url.searchParams.get('sn_id');

        // 如果 sn_id 有有效值
        if (snId && snId !== 'null') {
            return snId;
        }

        // 从 from 参数中解析
        const fromParam = url.searchParams.get('from');
        if (fromParam) {
            const fromUrl = new URL(decodeURIComponent(fromParam));
            const outTradeNo = fromUrl.searchParams.get('out_trade_no');

            if (outTradeNo) {
                const parts = outTradeNo.split('-');
                if (parts.length >= 3) {
                    return parts[1]; // 返回中划线中间的值
                }
            }
        }

        return null;

    } catch (error) {
        console.error('解析错误:', error);
        return null;
    }
}
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
    var template = '<!DOCTYPE html><html lang="zh-cmn-Hans"><head><meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"></head><body>'
                    +' <input type="date" name="datetime" style="margin: 10px;padding:10px">'
    if(state){
        const content = fs.readFileSync(path, { encoding: 'utf-8' })
        if(content.length>0){
            var _content = content.split(/\n/g)
            _content.reverse()
            for (let i = 0; i < _content.length; i++) {
                try {
                    const row =JSON.parse(_content[i]);
                    // 解析host，获取报告编号
                  const reportNo = getTargetValue(row.host);
                    template+= `
                        <div style="margin-bottom: 10px; border: 1px solid #ccc;padding: 10px">
                            <div> <b> id：</b>  ${reportNo}</div>
                            <div> <b> 时间：</b>  ${row.time}</div>
                            <div> <b> 手机：</b><span style="color:red" >${row.phone}</span></div>
                            <div> <b> 多选：</b> ${row.check}</div>
                            <div> <b> 详情：</b> ${row.desc}</div>
                            <div> <b> ip：</b> ${row.ip}</div>
                            <div> <b> host：</b> ${row.host}</div>
                            ${
                                row.snipaste? `
                                <a href="${row.snipaste}">图片</a>
                                `
                                :''
                            }
                        </div>
                    `
                } catch (error) {
                  console.error(error);

                    continue
                }

            }
        }else {

        }
    }
    res.setHeader('content-type', 'text/html;charset=UTF-8')
    /* javascript */
    template+= `
        <script>
        var datetime = document.querySelector('[name="datetime"]');
        datetime.addEventListener('blur',function(e){
            location.href = '/feedback/list?date=' + e.target.value
        })
        </script>
    `
    res.end(template+'</body></html>')
}

module.exports = Index
