const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/final13122021')
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.error('No se pudo conectar a MongoDB...'));
}