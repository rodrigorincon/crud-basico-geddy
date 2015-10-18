var CreateEmocaos = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('emocao', 'string');
          t.column('emoticon', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('emocao', def, callback);
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
    this.dropTable('emocao', callback);
  };
};

exports.CreateEmocaos = CreateEmocaos;
