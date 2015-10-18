(function () {
var Assoc = function () {

  this.defineProperties({    
  });

  this.belongsTo('Emocao');
  this.belongsTo('Mensagem');

};

exports.Assoc = Assoc;

}());

(function () {
var Emocao = function () {

  this.defineProperties({
    emocao: {type: 'string'},
    emoticon: {type: 'string'}
  });

  this.validatesPresent('emocao');
  this.validatesPresent('emoticon');
  this.validatesLength('emoticon', {max: 5});

  this.hasMany('Assocs');
  this.hasMany('Mensagems', {through: 'Assocs'});
  
};

Emocao = geddy.model.register('Emocao', Emocao);
}());

(function () {
var Estado = function () {

  this.defineProperties({
    nome: {type: 'string'}
  });

  this.validatesPresent('nome');

  this.hasMany('Pessoas');
};

Estado = geddy.model.register('Estado', Estado);
}());

(function () {
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
  this.belongsTo('Estado');

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