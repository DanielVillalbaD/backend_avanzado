'use strict';

var localStorage = require('localStorage');

module.exports = function() { // devuelve un middleware que si no hay usuario redirige al login
  return function(req, res, next) {
    var auth= localStorage.getItem('auth');
    if (!auth) {

      res.render('login');
      return;
    }
    next();
  }
}