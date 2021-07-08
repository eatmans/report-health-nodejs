const superagent = require('superagent');
const nodemailer = require('nodemailer');
const sd = require('silly-datetime');

const cors = require("cors")
var express = require('express')
var bodyParser = require('body-parser');
//设置主机名
var hostName = '0.0.0.0';
//设置端口
var port = 8099;

var app = express();
app.use(cors());
var routes = express.Router();
//设置路由访问路径和静态资源目录
app.use("/health", express.static('public'))
app.use("/health", routes);

routes.get('/login', (req, res) => {
    console.log(req.query.cellphone);
    var phone = req.query.cellphone;
    var code = req.query.code;
    var response = {};
    superagent.post('http://service-hall.ehall.gupt.edu.cn/login').set({
        "Content-Type": 'application/x-www-form-urlencoded',
        "Origin": "http://student-health-log-h5.ehall.gupt.edu.cn",
        "Referer": "http://student-health-log-h5.ehall.gupt.edu.cn/",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    }).send({
        "cellphone": phone,
        "code": code,
    }).then(function (superres, err) {
        if (err) {
            console.log(err)
            console.log(err.response);
            res.send(superres.response);
        } else {
            console.log(superres.response);
            res.send(superres.response);
        }
    }).catch((superres) => {
        console.log(superres.response.body);
        console.log(superres.response);
        res.send(superres.response.body);
    });
});

routes.get('/code', (req, res) => {
    console.log(req.query.cellphone)
    var phone = req.query.cellphone
    var response = {};
    superagent.post('http://service-hall.ehall.gupt.edu.cn/captcha/sms').set({
        "Origin": "http://student-health-log-h5.ehall.gupt.edu.cn",
        "Referer": "http://student-health-log-h5.ehall.gupt.edu.cn/",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    }).send({
        "cellphone": phone,
        "tokenType": "SIGNIN",
    }).then(function (superres, err) {
        if (err) {
            console.log(err)
            console.log(err.response);
            res.send(superres.response);
        } else {
            // console.log(superres)
            console.log(superres.response);
            res.send(superres.response);
        }
    }).catch((superres) => {
        console.log(superres.response.body);
        console.log(superres.response);
        res.send(superres.response.body);
    });
});

var server = app.listen(port, hostName, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`服务开启成功【端口号:${port}】`)
    }
});

