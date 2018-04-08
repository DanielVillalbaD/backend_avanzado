var express = require('express');
var router = express.Router();
const i18n = require('../lib/i18nConfigure')();
const jwtAuth = require('../lib/jwtAuth');
const Usuario = require('../models/Usuario');

const { query, validationResult } = require('express-validator/check');

const upload = require('../lib/uploadConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

router.post('/upload', upload.single('imagen'), (req, res, next) => {
  console.log('upload:', req.file);
  res.redirect('/');
});

module.exports = router;
