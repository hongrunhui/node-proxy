###项目简介
<blockquote>
一个基于```node```和```express```的小工具，用来解决前端数据接口调用所产生```跨域```的问题，基本原理只是起到一个```api服务中转```的作用，就是将远程的api接口映射到本地服务器上。
</blockquote><br/>
###使用方法
1、直接下载文件到你的node后端服务主目录下（或者直接把```node-proxy```下的```proxy.js```文件拷贝到主目录下），如我的文件目录如下
![Alt text](./1473560700120.png)


2、安装依赖文件，在你的```package.json```中的依赖项加入```http、request、express、body-parser、ejs```等依赖项，如我的package.json：
```
{
  "name": "node-proxy",
  "main": "main.js",
  "dependencies": {
    "express": "~4.0.0",
    "mongoose": "~3.6.13",
    "body-parser": "~1.0.1",
    "formidable": "*",
    "redis": "*",
    "mysql": "*",
    "ejs":"*"
  },
  "devDependencies": {
    "request": "^2.74.0"
  }
}

```
其中依赖项放在devDependencies还是dependencies中无所谓，（body-parse貌似是来解析app回调函数中的参数的，最好加上吧）
3、在node服务的主文件main.js中加入以下代码：
```
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
```
以上代码实现请求将[聚合数据-天气API](https://www.juhe.cn/docs/api/id/73)代理到本地的/api/weather路径下。使用接口方法```node main.js```：
![Alt text](./1473561163276.png)
然后在index.html中加入以下代码：
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>node-proxy代理</title>
  <script src="http://cdn.bootcss.com/jquery/2.2.2/jquery.min.js"></script>
</head>
<body>

</body>
<script>
var val = '北京';
var tianqiData = {
        cityname:val,
        key: '05eaf356f8c8c6b6a7d860deb3750f19'
    };
tianqiData.cityname = decodeURI(encodeURI(tianqiData.cityname));
$.get('/api/weather',tianqiData,function(data){
  console.log(data);
});
</script>
</html>

```
浏览器输入```localhost:2016```,结果如下：
![Alt text](./1473561224840.png)
之前在前端调用聚合数据的api是需要会出现跨域问题（貌似还不能使用jsonp），现在使用这个可以解决这个问题.
