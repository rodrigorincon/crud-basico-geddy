var Estado = function () {

  this.defineProperties({
    nome: {type: 'string'}
  });

  this.validatesPresent('nome');

  this.hasMany('Pessoas');
};

Estado = geddy.model.register('Estado', Estado);
