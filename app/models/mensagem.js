var Mensagem = function () {

  this.defineProperties({
    texto: {type: 'text'},
    data: {type: 'date'}
  });

  this.validatesPresent('texto');
  this.validatesPresent('data');

  this.belongsTo('Pessoa');
  this.hasMany('Assocs');
  this.hasMany('Emocaos', {through: 'Assocs'});

};

/*
// Can also define them on the prototype
Mensagem.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Mensagem.someStaticMethod = function () {
  // Do some other stuff
};
Mensagem.someStaticProperty = 'YYZ';
*/

Mensagem = geddy.model.register('Mensagem', Mensagem);
