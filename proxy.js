var request = require('request');
//使用例子
// proxy(app,'/hfutoj','http://***');
//app是express中的app,route是本地api接口路径，remoteUrl是被代理的提供JSON数据的地址
function proxy(app,route,remoteUrl){
    app.use(route,function(req,res){
      var temp = req._parsedUrl.search?req._parsedUrl.search:req.url;
      var url = remoteUrl+temp;
      console.log(url);
      req.pipe(request(url)).pipe(res);
    });
}
exports.setProxy = proxy;
