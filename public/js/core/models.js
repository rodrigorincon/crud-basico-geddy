(function () {
var Mensagem = function () {

  this.defineProperties({
    texto: {type: 'text'},
    data: {type: 'date'}
  });

  this.validatesPresent('texto');
  this.validatesPresent('data');

  this.belongsTo('Pessoa');

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
}());

(function () {
var Pessoa = function () {

  this.defineProperties({
    nome: {type: 'string'},
    email: {type: 'string'},
    dataNascimento: {type: 'date'},
    senha: {type: 'string'}
  });
 
  this.validatesPresent('nome');
  this.validatesLength('senha', {min: 5});
  this.validatesConfirmed('senha', 'confirmPassword');
  this.validatesFormat('email', /^[-a-z0-9~!$%^&*_=+}{\?]+(\.[-a-z0-9~!$%^&*_=+}{\?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, {message: 'email errado!'});

  this.hasMany('Mensagems');

};

/*
// Can also define them on the prototype
Pessoa.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Pessoa.someStaticMethod = function () {
  // Do some other stuff
};
Pessoa.someStaticProperty = 'YYZ';
*/

Pessoa = geddy.model.register('Pessoa', Pessoa);
}());