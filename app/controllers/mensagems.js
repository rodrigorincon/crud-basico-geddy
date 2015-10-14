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
      self.respond({params: params, pessoas: data});
    });
  };

  this.create = function (req, resp, params) {
    var self = this
      , mensagem = geddy.model.Mensagem.create(params);

    if (!mensagem.isValid()) {
      this.respondWith(mensagem);
    }
    else {
      mensagem.save(function(err, data) {
        if (err) {
          throw err;
        }
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
          }
          //FEEL THE POWER OF GAMBIARRA!
          mensagem.pessoa = data
          
          self.respondWith(mensagem);
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
        geddy.model.Pessoa.all(function (err, data) {
          if (err) {
            throw err;
          }
          self.respond({mensagem: mensagem, pessoas: data});
        });
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      mensagem.updateProperties(params);

      if (!mensagem.isValid()) {
        self.respondWith(mensagem);
      }
      else {
        mensagem.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(mensagem, {status: err});
        });
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
        geddy.model.Mensagem.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(mensagem);
        });
      }
    });
  };

};

exports.Mensagems = Mensagems;
