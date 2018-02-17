'use strict';

const mongoose = require('mongoose');


const anuncioSchema = mongoose.Schema({
  name: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});


anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields, callback) {
  // obtenemos la query sin ejecutarla
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec(callback);
};

// creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
