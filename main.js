const superagent = require('superagent');
const nodemailer = require('nodemailer');
const sd = require('silly-datetime');

const auth = "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNDY5MDllMDdjNzIxMWVhYmNlYjgwMTkzNDNhOGUwNSIsIm5iZiI6MTYyMjE5ODU0MiwiZXhwIjoxNjIyODAzMzQyLCJ1c2VyIjp7InVzZXJfdHlwZSI6InN0dWRlbnQiLCJnZW5kZXIiOm51bGwsInVzZXJfaWQiOiIwNDY5MDllMDdjNzIxMWVhYmNlYjgwMTkzNDNhOGUwNSIsIm5pY2tuYW1lIjpudWxsLCJuYW1lIjoi5ZC05pmT5Z2aIiwiY2VsbHBob25lIjoiMTU5ODYyMzUzNDQiLCJydW5fYXMiOiJST0xFX1VTRVIiLCJhdmF0YXIiOiJodHRwOlwvXC9zdG9yYWdlLmVoYWxsLmd1cHQuZWR1LmNuXC9pbWc_cD0xODA5MmI2ZjRlMzE0NTliYTA0OGI5NDY0Y2IyNWZmMSIsImNvbXBlbGxhdGlvbiI6IuWQtOaZk-WdmiIsImVtYWlsIjoiZWF0bWFuc0AxNjMuY29tIiwidXNlcm5hbWUiOm51bGwsInVzZXJfbm8iOiIxOTE3MDIyMjUifSwiaWF0IjoxNjIyMTk4NTQyfQ.cffDv2s9FssDInHdaiu3daZYZSIYIgwqLhLWxJfnkQcMCMVHiFAsOAzBiQWF7xTQR29Lb_vbxt614KTf97QsCXfyTA5LH4lUfJJvdWZqfiYb-2ZKW4pvwg72-9pNB68731RB6-Nuc69SVhdDBr8T9d3XB1ukOBeJadKLDwmFBaY";

let transporter = nodemailer.createTransport({
    service: 'smtp.163.com',
    host: "smtp.163.com",
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: 'sdzxml@163.com',
        // smtp授权码
        pass: 'CKXZDXOHNOIIQRWV',
    }
});

let mailOptions = {
    from: '"健康上报提醒机" <sdzxml@163.com>', // sender address
    to: '1348879120@qq.com', // list of receivers
    subject: '健康上报成功', 
    html: '<b>Hello world！</b>' 
};

function send(scheduleType) {
    var time = sd.format(new Date(), 'YYYY-MM-DD');
    superagent
        .post('http://student-health-log.ehall.gupt.edu.cn/student/health/reportHealth')
        .send({
            "stuName": "吴晓坚",
            "orgName": "计算机学院",
            "grade": "2019",
            "className": "软件1935",
            "dormitoryName": "217",
            "dormName": "407",
            "bedNumber": "2",
            "phone": "15986235344",
            "reportDate": time,
            "scheduleType": scheduleType,
            "temperature": "36.6",
            "onHealth": "true",
            "onSchool": "true",
            "id": "1913328",
            "stuNo": "191702225",
            "orgCode": "17",
            "classCode": "17021902"
        })
        .set({
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Authorization": auth,
            "Connection": "keep-alive",
            "Content-Type": "application/json;charset=UTF-8",
            "Host": "student-health-log.ehall.gupt.edu.cn",
            "Origin": "http://student-health-log-h5.ehall.gupt.edu.cn",
            "Referer": "http://student-health-log-h5.ehall.gupt.edu.cn/",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
            "X-Requested-With": "XMLHttpRequest"
        })
        .end(function (err, res) {
            if (err) {
                mailOptions.subject = '妈呀！健康上报失败了！！';
                mailOptions.html = "<b>" + time + "</b>";
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });
                console.log('申报失败');
            } else {
                mailOptions.subject = '健康上报成功';
                mailOptions.html = "<b>" + time + "</b>"
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });
                console.log('申报成功');
            }
        })

};

function remind(){
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    mailOptions.subject = '程序启动成功！！';
    mailOptions.html = "<b>" + time + "</b>";
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

if (new Date().getHours == 22) {
    // 22 是早上六点，与国际时间加8
    send("MORNING");
} else if(new Date().getHours == 8) {
    // 8是下午四点
    send("NIGHT");
}else{
    remind();
}

console.log("程序启动成功！！");
