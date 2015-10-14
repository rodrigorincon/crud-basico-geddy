var RelacaoPessoaMensagem = function () {
  this.up = function (next) {
    this.addColumn('mensagems', 'pessoaId', 'string', function (err, data) {
      if (err) { throw err; }
      next();
    });
  };

  this.down = function (next) {
    next();
  };
};

exports.RelacaoPessoaMensagem = RelacaoPessoaMensagem;
