var http = require('http');
var fs = require('fs');
var url= require('url');
var path = "./Views/";
var mysql = require('mysql');
var dbPaciente = require('./Models/Database/dbPaciente.js');
var dbMedico = require('./Models/Database/dbMedico.js');
var dbModerador = require('./Models/Database/dbModerador.js');
var dbUsuario = require('./Models/Database/dbUsuario.js');
var dbPergunta = require('./Models/Database/dbPergunta.js');
var dbResposta = require('./Models/Database/dbResposta.js');
var routesTeste = require('./Controllers/routesTeste.js');
var routesLogin = require('./Controllers/routesLogin.js');
var routesRegister = require('./Controllers/routesRegister.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "Eduardo",
  password: "123",
  database: "website"
});



//require(path + 'yourfile.js');

// Não funcionou essa função

/*function auxSelector(route, type, req, res)
{
	switch(type)
	{
		case 'html': route.salvaHTML(req, res);
		break;
		case 'css': route.salvaCSS(req, res);
		break;
		case 'js': route.salvaJS(req, res);
		break;
		default:

	}
}*/

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function selector(req,res)
{
adr=req.url;
q=url.parse(adr,true);
path=q.pathname;
var indexOfDot = path.indexOf('.');
var type = path.substr(indexOfDot+1); // html, css, js, ...
path = path.substr(1, indexOfDot-1); // parse da string (remove '/' inicial e após o '.')

console.log(path);
console.log(type);
// --> qdo for comunicar por .js acho q tem q dar um nome que vai cair em algum switch daqui <--


switch(type)
{
case '/checkLogin':
	console.log('checking Login...');
	routesLogin.salvaJSON(req,res);
break;
}
if(req.method!="POST")
{
switch(path)
{
case "login":
	switch(type)
	{
		case 'html': routesLogin.salvaHTML(req, res);
		break;
		case 'css': routesLogin.salvaCSS(req, res);
		break;
		case 'js': routesLogin.salvaJS(req, res);
		break;
		case 'png': routesLogin.salvaPNG(req, res);
		break;
		default:
	}
break;
case "test":
	switch(type)
	{
		case 'html': routesTeste.salvaHTML(req, res);
		break;
		case 'css': routesTeste.salvaCSS(req, res);
		break;
		case 'js': routesTeste.salvaJS(req, res);
		break;
		default:
	}
  case "register":
  	switch(type)
  	{
  		case 'html': routesRegister.salvaHTML(req, res);
  		break;
  		case 'css': routesRegister.salvaCSS(req, res);
  		break;
  		case 'js': routesRegister.salvaJS(req, res);
  		break;
  		default:
  	}
break;
default:
	// 404 error
	res.writeHead(404, {'Content-Type': 'text/css'});
    return res.end("404 Not Found");
}
}
else
{
  switch(req.url)
  {
  case "login":routesLogin.realizarLogin(req,res,con);
  break;
  case "test":0;
  break;
  case "/register":routesRegister.salvaUsuario(req,res,con);
  break;
  default:
  	// 404 error
  	res.writeHead(404, {'Content-Type': 'text/css'});
      return res.end("404 Not Found");
  }

}


}


http.createServer(
  /*console.log(req.url);
  switch(req.url)
  {
  case "/":routesTeste.salvaHTML(req,res);
  break;
  case "/test.js":routesTeste.salvaJS(req,res);
  break;
  case "/test.css":routesTeste.salvaCSS(req,res);
  break;
  default:routesTeste.salvaJSON(req,res);

}*/function(req,res){



selector(req, res);
}


).listen(8080);
