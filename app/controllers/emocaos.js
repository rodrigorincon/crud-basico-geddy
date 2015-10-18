var Emocaos = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Emocao.all(function(err, emocaos) {
      if (err) {
        throw err;
      }
      self.respondWith(emocaos, {type:'Emocao'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , emocao = geddy.model.Emocao.create(params);

    if (!emocao.isValid()) {
      this.respondWith(emocao);
    }
    else {
      emocao.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(emocao, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Emocao.first(params.id, function(err, emocao) {
      if (err) {
        throw err;
      }
      if (!emocao) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(emocao);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Emocao.first(params.id, function(err, emocao) {
      if (err) {
        throw err;
      }
      if (!emocao) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(emocao);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Emocao.first(params.id, function(err, emocao) {
      if (err) {
        throw err;
      }
      emocao.updateProperties(params);

      if (!emocao.isValid()) {
        self.respondWith(emocao);
      }
      else {
        emocao.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(emocao, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Emocao.first(params.id, function(err, emocao) {
      if (err) {
        throw err;
      }
      if (!emocao) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Emocao.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(emocao);
        });
      }
    });
  };

};

exports.Emocaos = Emocaos;
