var http = require('http');
var fs = require('fs');
var url= require('url');
var path = "./Views/";
var mysql = require('mysql');

var Routes=require('./Controllers/routes.js');

var con = mysql.createConnection({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b089b876f46b39",
  password: "e7e02c90",
  database: "heroku_cb42695d67403c5"
});




function selector(req,res)
{
adr=req.url;
q=url.parse(adr,true);
path=q.pathname;
console.log("Path:"+path);

var Router=new Routes();
if(req.method!="POST")
  Router.get(req,res,path);
else
  Router.post(req,res,con);
}

var port = process.env.PORT || 8080;
http.createServer(function(req,res){
console.log(con.state);
selector(req, res);
}


).listen(port);
