var CreatePessoas = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('nome', 'string');
          t.column('email', 'string');
          t.column('dataNascimento', 'date');
          t.column('senha', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('pessoa', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('pessoa', callback);
  };
};

exports.CreatePessoas = CreatePessoas;
