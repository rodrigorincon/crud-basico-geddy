var assert = require('assert')
  , tests
  , Emocao = geddy.model.Emocao;

tests = {

  'after': function (next) {
    // cleanup DB
    Emocao.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var emocao = Emocao.create({});
    emocao.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
