var mongoose = require('mongoose');
var Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/nodepop').then( async (err, res) => {
    try {    
    await Anuncio.deleteMany()
        .then(Usuario.deleteMany())
        .then(Usuario.insertMany([
            { 
              name: 'admin',
              email: 'admin@example.com',
              password: Usuario.hashPassword('1234')
            }
        ]))
        .then((res) => {
            console.log('Users added');
            mongoose.connection.close();
        })
    } catch(err) {
        console.log("Reset DB Users Error");
        return;
    }
})