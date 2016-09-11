var express = require('express');
var app = express();
var http = require("http");
var bodyParser = require('body-parser');
var proxy = require('./proxy');
var ejs = require('ejs');
var port = process.env.PORT||2016;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//页面渲染（页面路由）
app.use(express.static(__dirname+'/'));
app.set('views', __dirname + '/');
app.engine('.html', ejs.__express)
app.set('view engine','html');
app.get("/",function(req,res){
	res.render('index');
});
proxy.setProxy(app,'/api/weather','http://op.juhe.cn/onebox/weather/query');
http.createServer(app).listen(port);
console.log("正在监听%d端口...",port);
