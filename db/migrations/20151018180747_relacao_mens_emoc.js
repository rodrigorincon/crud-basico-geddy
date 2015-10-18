var RelacaoMensEmoc = function () {
  this.up = function (next) {
    this.addColumn('assocs', 'mensagemId', 'string', function (err, data) {
      if (err) { throw err; }
      next();
    });
    this.addColumn('assocs', 'emocaoId', 'string', function (err, data) {
      if (err) { throw err; }
      next();
    });
  };

  this.down = function (next) {
    next();
  };
};

exports.RelacaoMensEmoc = RelacaoMensEmoc;
