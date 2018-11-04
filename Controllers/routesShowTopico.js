
var path = './Views/search/';
var fs = require('fs');

var dbPergunta = require('../Models/Database/dbPergunta.js');
var dbResposta = require('../Models/Database/dbResposta.js');
var dbUsuario =require('../Models/Database/dbUsuario.js');


function MostrarTopico(req,res,con,topico)
{
  var body = '';
  req.on('data', function (data) {
      body += data;

      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
          // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
          req.connection.destroy();
      }
  });
  req.on('end', function () {


      resultados=JSON.parse(body);
      console.log(resultados);
      dbUsuario.obtemUsuario(con,resultados.cookie).then(function(results)
    {
      if(results[0]==undefined)
      {	res.writeHead(404, {'Content-Type': 'text/css'});
        return res.end("404 Not Found");
      }

      dbPergunta.obtemPerguntaTitulo(con,topico).then(function(results)
      {
        dbResposta.obtemRespostaParaPergunta(con,topico).then(function(results2))
        {


          res.writeHead(200, {'Content-Type': 'application/json'});
        console.log("Acabou:");
        console.log(res.finished);

        var valor=JSON.stringify([results,results2]);
        console.log(valor);

      res.write(valor);
      res.end();
    });
      });

    })


})
}
exports.MostrarPerguntas=MostrarPerguntas;
