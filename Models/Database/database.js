
dbResposta=require('./dbResposta.js');
mysql=require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "Eduardo",
  password: "123",
  database: "website"
});
/*dbPaciente.obtemPaciente(con,"gafonseca").then(function(results)
{
console.log(results);
})

dbPaciente.obtemPacientes(con).then(function(results)
{
console.log(results);
})

dbUsuario.loginUsuario(con,"eoschonhofen","batataFrita123").then(function(results)
{
console.log(results);
})

dbPergunta.obtemPerguntaTitulo(con, 'como costurar meu braço de volta?').then(function(results)
{
console.log(results);
})*/

dbResposta.obtemRespostas(con).then(function(results)
{
console.log(results);
})
