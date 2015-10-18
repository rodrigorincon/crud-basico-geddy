var async = require("async")

var Mensagems = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Mensagem.all({}, {includes: 'pessoas'},function(err, mensagems) {
      if (err) {
        throw err;
      }
      self.respondWith(mensagems, {type:'Mensagem'});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
    geddy.model.Pessoa.all(function (err, data) {
      if (err) {
        throw err;
      }
      geddy.model.Emocao.all(function (err2, data2) {
        if (err2) {
          throw err2;
        }if(!data2){
          throw new geddy.errors.NotFoundError();
        }
        self.respond({params: params, pessoas: data, emocaos: data2});
      });
    });
  };

  this.create = function (req, resp, params) {
    var self = this
      , mensagem = geddy.model.Mensagem.create(params);

    if (!mensagem.isValid()) {
      this.respondWith(mensagem);
    }
    else {
      console.log(params)

      mensagem.save(function(err, data) {
        if (err) {
          throw err;
        }
        params.emocaos = vetorizaParametro(params.emocaos)
        addEmocoesSaveMensagem(mensagem, params.emocaos, function(msg, error){
          self.respondWith(msg, {status: error});
        })
        self.respondWith(mensagem, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      if (!mensagem) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        mensagem.getPessoa(function(err,data){
          if (err) {
            throw err;
          }if(!data){
            throw new geddy.errors.NotFoundError();
          }
          //FEEL THE POWER OF GAMBIARRA!
          mensagem.pessoa = data
          mensagem.getEmocaos(function (err2, emocaos) {
            if (err2) {
              throw err2;
            }if(!emocaos){
              throw new geddy.errors.NotFoundError();
            }
            mensagem.emocaos = emocaos;
            self.respondWith(mensagem);
          });
        });
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      if (!mensagem) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        mensagem.getPessoa(function (err,escritor){
          mensagem.pessoa = escritor
          geddy.model.Pessoa.all(function (err, data) {
            if (err) {
              throw err;
            }
            geddy.model.Emocao.all(function (err, emocaos_todas) {
              if (err) {
                throw err;
              }if(!emocaos_todas){
                throw new geddy.errors.NotFoundError();
              }
              mensagem.getEmocaos(function (err, minhas_emocaos) {
                if (err) {
                  throw err;
                }if(!minhas_emocaos){
                  throw new geddy.errors.NotFoundError();
                }
                self.respond({mensagem: mensagem, pessoas: data, emocaos: emocaos_todas, minhas_emocaos: minhas_emocaos});
              });
            });
          });
        });
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Mensagem.first(params.id, function(err, mensagem) {
      if (err)
        throw err;
      mensagem.updateProperties(params);
      if (!mensagem.isValid()) 
        self.respondWith(mensagem);
      else {
        params.emocaos = vetorizaParametro(params.emocaos)
        editaListaEmocoes(mensagem, params.emocaos, function(err,results){
          if(err)
            throw err;
          addEmocoesSaveMensagem(mensagem, params.emocaos, function(msg, error){
            self.respondWith(msg, {status: error});
          })
        })
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      if (!mensagem) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        mensagem.getAssocs(function(err,assocs){
          if (err)
            throw err;
          if (!assocs)
            throw new geddy.errors.BadRequestError();
          async.map(assocs, function(assoc, callback){
            geddy.model.Assoc.remove(assoc.id, function(err){
              if (err)
                callback(err)
              callback(null,null)
            })
          },function(err,results){
            if(err)
              throw err
            geddy.model.Mensagem.remove(params.id, function(err) {
              if (err)
                throw err;
              self.respondWith(mensagem);
            });
          })
        })
      }
    });
  };

};

exports.Mensagems = Mensagems;

function vetorizaParametro(param){
  if(!param)
    param = []
  if( typeof(param)=="string" )
    param = [param]
  return param
}

function addEmocao(mensagem, emocao_id, callback){
  geddy.model.Emocao.first(emocao_id, function(err, emocao){
    if(err)
      callback(err);
    if(!emocao)
      callback( new geddy.errors.NotFoundError() );
    mensagem.addEmocao(emocao)        
    callback(null,emocao)
  })
}

function addEmocoesSaveMensagem(mensagem, emocoes, finalizeFunction){
  async.map(emocoes, function(emocao_id,callback){
    addEmocao(mensagem, emocao_id, callback)
  }, function(err,results){
    if(err)
      throw err;
    mensagem.save(function(err,data){
      if(err)
        throw err
      finalizeFunction(mensagem,err)
    })
  })
}

function editaListaEmocoes(mensagem, emocoes_novas, funcao_retorno){
  mensagem.getAssocs(function(err,assocs_atuais){
    if (err)
      throw err;
    if (!assocs_atuais)
      throw new geddy.errors.BadRequestError();
    async.map(assocs_atuais, function(assoc, callback){
      var elimindado = false
      for(var i in emocoes_novas){
        if(assoc.emocaoId == emocoes_novas[i]){
          emocoes_novas.splice(i,1)
          callback(null,null)
          elimindado = true
        }
      }
      if(!elimindado){
        geddy.model.Assoc.remove(assoc.id, function(err){
          if (err)
            callback(err)
          callback(null,null)
        })
      }
    },funcao_retorno)
  })
}
