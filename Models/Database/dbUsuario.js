var database = require('./database.js');
var utilitary = require('./utilitary.js');
function obtemUsuario(nomeUsuario)
{
  return new Promise(function(resolve,reject)
{
  busca="Select * from Usuario where nomeUsuario='"+nomeUsuario+"'";
  database.query(busca,function(error,results,fields){
    if(error)
    {
      return console.error(error.message);
    }
    resolve(results);
});
});
}

function obtemUsuarios()
{
  return new Promise(function(resolve,reject)
{
  busca="Select * from Usuario";
  database.query(busca,function(error,results,fields){
    if(error)
    {
      return console.error(error.message);
    }
    resolve(results);
});
});
}

function obtemUsuariosNaoModeradores()
{
  return new Promise(function(resolve,reject)
{
  busca="Select * from Usuario WHERE not eModerador";
  database.query(busca,function(error,results,fields){
    if(error)
    {
      return console.error(error.message);
    }
    resolve(results);
});
});
}

function loginUsuario(nomeUsuario,senha)
{
  return new Promise(function(resolve,reject)
{
  busca="Select * FROM Usuario WHERE nomeUsuario='"+nomeUsuario+"' and senha='"+senha+"'";
  console.log(busca);
  database.query(busca,function(error,results,fields){
    if(error)
    {
      return console.error(error.message);
    }
    console.log(results);
    console.log(fields);
    resolve(results);
});
});
}

function deletaUsuario(username)
{
  insert="DELETE FROM  Usuario WHERE nomeUsuario='{}'";
  insert=utilitary.printf(insert,[username]);
  database.query(insert,function(error,results){
    if(error)
    {
      return console.error(error.message);
    }
  });
}

function atualizaAvaliacao(nomeUsuario,nota)
{
  insert="UPDATE  RESPOSTA SET totalDeAvaliacoes=totalDeAvaliacoes+1,somaDeAvaliacoes=somaDeAvaliacoes+{} WHERE nomeUsuario='{}'";
  insert=utilitary.printf(insert,[nota,nomeUsuario]);
  database.query(insert,function(error,results){
    if(error)
    {
      return console.error(error.message);
    }
})

}

exports.deletaUsuario=deletaUsuario;
exports.obtemUsuario=obtemUsuario;
exports.obtemUsuarios=obtemUsuarios;
exports.obtemUsuariosNaoModeradores = obtemUsuariosNaoModeradores;
exports.loginUsuario=loginUsuario;
exports.atualizaAvaliacao=atualizaAvaliacao;
