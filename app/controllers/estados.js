var Estados = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Estado.all(function(err, estados) {
      if (err) {
        throw err;
      }
      self.respondWith(estados, {type:'Estado'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , estado = geddy.model.Estado.create(params);

    if (!estado.isValid()) {
      this.respondWith(estado);
    }
    else {
      estado.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(estado, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Estado.first(params.id, function(err, estado) {
      if (err) {
        throw err;
      }
      if (!estado) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(estado);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Estado.first(params.id, function(err, estado) {
      if (err) {
        throw err;
      }
      if (!estado) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(estado);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Estado.first(params.id, function(err, estado) {
      if (err) {
        throw err;
      }
      estado.updateProperties(params);

      if (!estado.isValid()) {
        self.respondWith(estado);
      }
      else {
        estado.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(estado, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Estado.first(params.id, function(err, estado) {
      if (err) {
        throw err;
      }
      if (!estado) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Estado.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(estado);
        });
      }
    });
  };

};

exports.Estados = Estados;
