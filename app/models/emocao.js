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
