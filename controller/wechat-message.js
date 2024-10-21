var https = require("https");
var http = require("http");

function sendMsg(aToken, content) {
    const params = JSON.stringify({
        touser: 'oz-at6HdNgIu24LT84xo9bryTGwE',
        template_id: 'SOp7WDJMT1cBvtDvEa7mpH2nLiMZRgZpJiiDPmZOudU',
        url: 'http://test.mbti.ink/feedback/list',
        data:
        {
            thing4: { value: content.ip },
            time16: { value: content.time },
            thing11: { value: content.phone|| '无' },
            thing29: { value: content.host.substr(-10) }
        }
    })
    var options = {
        hostname: 'api.weixin.qq.com',
        path: '/cgi-bin/message/template/send?access_token=' + aToken,
        method: "post",
        "headers": {
            "Content-Type": "application/json",
            'Content-Length': Buffer.byteLength(params),
          }
    };
    var req = https.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            console.log(chunks.toString());
        });
    });

 
    req.on('error', function(err){
        console.error(err);
    })
    req.write(params);
    req.end();
}

function getAccessToken(cb) {
    const request = http.get('http://127.0.0.1:7200/access_token', function (res) {
        let body = Buffer.alloc(0)

        res.on('data', function (chunk) {
            body = Buffer.concat([body, chunk])
        })

        res.on('end', function () {
            body = JSON.parse(body.toString())
            cb(body.access_token)
        })
    })

    request.on('error', function (err) {
        console.error(err);
    })
}

function wechatMessage(content){
    getAccessToken((access_token) => {
        sendMsg(access_token, content)
    })
}

module.exports = wechatMessage;