var assert = require('assert')
  , tests
  , Estado = geddy.model.Estado;

tests = {

  'after': function (next) {
    // cleanup DB
    Estado.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var estado = Estado.create({});
    estado.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
