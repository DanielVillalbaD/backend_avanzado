var mongoose = require('mongoose')
var Anuncio = require('../models/Anuncio');

const data = [
    { name: "iphone 7", venta: true, precio: 400, foto: "../public/images/iphone7.jpg", tags: ["lifestyle", "mobile"] },
    { name: "iphone 6s", venta: true, precio: 300, foto: "../public/images/iphone6.jpg", tags: ["lifestyle", "mobile"] },
    { name: "iphone X", venta: false, precio: 800, foto: "../public/images/iphonex.jpg", tags: ["lifestyle", "mobile"] },
    { name: "Mercedes E350", venta: true, precio: 30000, foto: "../public/images/mercedes.jpg", tags: ["work", "motor"] },
    { name: "MacBook Pro", venta: false, precio: 1200, foto: "../public/images/macbook.jpg", tags: ["lifestyle", "work"] },
    { name: "iMac", venta: false, precio: 1000, foto: "../public/images/imac.jpg", tags: ["work"] }
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