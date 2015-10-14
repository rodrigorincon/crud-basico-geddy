var assert = require('assert')
  , tests
  , Pessoa = geddy.model.Pessoa;

tests = {

  'after': function (next) {
    // cleanup DB
    Pessoa.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var pessoa = Pessoa.create({});
    pessoa.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
