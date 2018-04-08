'use strict';

const jwt = require('jsonwebtoken');
var localStorage = require('localStorage');

/** 
 * Es el token JWT válido?
 */
module.exports = function() {
  return function(req, res, next) {

    const token = req.body.token || req.query.token || req.get('x-access-token') || localStorage.getItem('auth');

    if (!token) {
      const err = new Error('no token provided');
      next(err);
      return;
    }

    // verificamos el token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, descodificado) => {
      if (err) {
        next(err);
        return;
      }

      // apuntamos el _id en la petición para que lo usen los
      // siguientes middlewares
      req.apiUserId = descodificado._id;

      // el token es válido:
      next();

    });
  }
}