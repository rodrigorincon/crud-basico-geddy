var Pessoas = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Pessoa.all(function(err, pessoas) {
      if (err) {
        throw err;
      }
      self.respondWith(pessoas, {type:'Pessoa'});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
    geddy.model.Estado.all(function (err, data) {
      if (err) {
        throw err;
      }if(!data){
        throw new geddy.errors.NotFoundError();
      }
      self.respond({params: params, estados: data});
    });
  };

  this.create = function (req, resp, params) {
    var self = this
      , pessoa = geddy.model.Pessoa.create(params);

    if (!pessoa.isValid()) {
      this.respondWith(pessoa);
    }
    else {
      pessoa.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(pessoa, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Pessoa.first(params.id, function(err, pessoa) {
      if (err) {
        throw err;
      }
      if (!pessoa) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        pessoa.getMensagems(function (err, mensagens) {
          if (err) {
            throw err;
          }
          pessoa.mensagems = mensagens;
          pessoa.getEstado(function (err, estado) {
            if (err) {
              throw err;
            }if(!estado){
              throw new geddy.errors.NotFoundError();
            }
            pessoa.estado = estado.nome;
            self.respondWith(pessoa);
          });
        });
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Pessoa.first(params.id, function(err, pessoa) {
      if (err) {
        throw err;
      }
      if (!pessoa) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Estado.all(function (err, data) {
          if (err) {
            throw err;
          }if(!data){
            throw new geddy.errors.NotFoundError();
          }
          self.respond({pessoa: pessoa, estados: data});
        });
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Pessoa.first(params.id, function(err, pessoa) {
      if (err) {
        throw err;
      }
      pessoa.updateProperties(params);

      if (!pessoa.isValid()) {
        self.respondWith(pessoa);
      }
      else {
        pessoa.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(pessoa, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Pessoa.first(params.id, function(err, pessoa) {
      if (err) {
        throw err;
      }
      if (!pessoa) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Pessoa.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(pessoa);
        });
      }
    });
  };

};

exports.Pessoas = Pessoas;
