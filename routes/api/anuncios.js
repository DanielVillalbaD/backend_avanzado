'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) => { 

    try {
  
      const name = req.query.name;
      const venta = req.query.venta;
      const precio = req.query.precio;
      const tags = req.query.tags;
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      const sort = req.query.sort;
      const fields = req.query.fields;
  
      console.log(req.query)
  
      const filtro = {};
  
      if (typeof name !== 'undefined') { 
        filtro.name = new RegExp('^'+ name, "i");
      }
  
      if (typeof venta !== 'undefined') {
        filtro.venta = venta;
      }

      if (typeof precio !== 'undefined') {
        
        const limits = precio.split('-');

        if (limits.length === 1) {
            filtro.precio = precio;
        } else {
            if (!limits[1] == '' && !limits[0] == '') {
                filtro.precio = { $gte: limits[0], $lte: limits[1] };
            } else {
                if (!limits[0] == '') {
                    filtro.precio = { $gte: limits[0] };
                } else {
                    filtro.precio = { $lte: limits[1] };
                }
            }
        }      
      }

      if (typeof tags !== 'undefined') { 
        filtro.tags = tags;
      }
      
      const docs = await Anuncio.listar(filtro, skip, limit, sort, fields); 
      
      res.json({ success: true, result: docs });  
    } catch(err) {
      next(err);
      return;
    }  
  });
  
  // POST /
  // Añadir un Anuncio
  router.post('/', (req, res, next) => {
    console.log(req.body);
  
    const data = req.body;
    
    // creamos documento de Anuncio en memoria
    const anuncio = new Anuncio(data);
    
    // lo persistimos en la base de datos
    anuncio.save( async (err, AnuncioGuardado) => { // .save es método de instancia
      if (err) {
        next(err);
        return;
      }
      res.json({ success: true, result: AnuncioGuardado });
    });
  });
  
  // DELETE /
  // Elimina un Anuncio
  router.delete('/:id', async (req, res, next) => {
    try {
      const _id = req.params.id;
      await Anuncio.remove({_id: _id}).exec(); // .remove es método estático
      res.json({ success: true });
    } catch(err) {
      next(err);
      return;
    }
  });
  
  // PUT /
  // Actualiza un Anuncio
  router.put('/:id', async (req, res, next) => {
    try {
      const _id = req.params.id;
      const data = req.body;
  
      const AnuncioActualizado = await Anuncio.findByIdAndUpdate(_id, data, { 
        new: true // esto es para obtener la nueva versión del documento
                  // tras actualizarlo
      });
      
      res.json({ success: true, result: AnuncioActualizado });
  
    } catch(err) {
      next(err);
      return;
    }
  });
  
  module.exports = router;