var CreateAssocs = function () {
  this.up = function (next) {
    var def = function (t) {
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('assoc', def, callback);
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
    this.dropTable('assoc', callback);
  };
};

exports.CreateAssocs = CreateAssocs;
