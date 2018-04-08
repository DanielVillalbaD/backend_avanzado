var mongoose = require('mongoose');
var Anuncio = require('../models/Anuncio');
var Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const data = [
    { name: "iphone 7", venta: true, precio: 400, foto: "images/iphone7.jpg", tags: ["lifestyle", "mobile"] },
    { name: "iphone 6s", venta: true, precio: 300, foto: "images/iphone6.jpg", tags: ["lifestyle", "mobile"] },
    { name: "iphone X", venta: false, precio: 800, foto: "images/iphonex.jpg", tags: ["lifestyle", "mobile"] },
    { name: "Mercedes E350", venta: true, precio: 30000, foto: "images/mercedes.jpg", tags: ["work", "motor"] },
    { name: "MacBook Pro", venta: false, precio: 1200, foto: "images/macbook.jpg", tags: ["lifestyle", "work"] },
    { name: "iMac", venta: false, precio: 1000, foto: "images/imac.jpg", tags: ["work"] },
    { name: "Ferrari 458", venta: false, precio: 90000, foto: "images/ferrari.jpg", tags: ["motor"] }
 ];


mongoose.connect('mongodb://localhost/nodepop').then( async (err, res) => {
    try {    
    await Anuncio.deleteMany()
        .then(Anuncio.insertMany(data))
        .then((res) => {
            console.log('Example ads added');
            mongoose.connection.close();
        })
    } catch(err) {
        console.log("Reset Database Error");
        return;
    }
})