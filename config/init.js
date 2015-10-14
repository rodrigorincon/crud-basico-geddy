var async = require("async")

var init = function(cb) {
  // Add uncaught-exception handler in prod-like environments
  if (geddy.config.environment != 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);
    });
  }else{
    geddy.model.Estado.all(function (err, old_datas) {
      if(err){
        console.error("falha ao limpar a tabela")
        throw err;
      }
      async.map(old_datas, esvaziaTabelaEstado, alimentaTabelaEstado);
    });
  }
  cb();
};

function esvaziaTabelaEstado(estado,callback){
  geddy.model.Estado.remove(estado.id, function (err, data) {
    if(err){
      console.error("falha ao remover dados")
      callback(err);
    }
    callback(null,null);
  });
}

function alimentaTabelaEstado(err,results){
  if(err){
    console.error("algum erro ocorreu ao limpar a tabela: ")
    throw err;
  }
  var estados_brasil = ["Acre", "Amazonas", "Pará", "Roraima", "Rondônia", "Amapá", "Goiás", "Mato Grosso", "Mato Grosso do Sul", "Distrito Federal", "Tocantis", "Maranhão", "Piauí", "Ceará", "Rio Grande do Norte", "Paraíba", "Alagoas", "Sergipe", "Pernambuco", "Bahia", "Minas Gerais", "Espírito Santo", "São Paulo", "Rio de Janeiro", "Paraná", "Santa Catarina", "Rio Grande do Sul"].sort()
  estados_brasil.forEach(function(estado, index, array){
    var uf = geddy.model.Estado.create({nome: estado}).save(function(error,dados){
      if(error)
        throw error;
      console.log(estado+" criado\n")
    });
  });
}

exports.init = init;