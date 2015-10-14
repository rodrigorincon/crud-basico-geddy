var RelacaoPessoaEstado = function () {
  this.up = function (next) {
    this.addColumn('pessoas', 'estadoId', 'string', function (err, data) {
      if (err) { throw err; }
      next();
    });
  };

  this.down = function (next) {
    next();
  };
};

exports.RelacaoPessoaEstado = RelacaoPessoaEstado;
