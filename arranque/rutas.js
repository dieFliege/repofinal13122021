const express = require('express');
const turnos = require('../rutas/turnos');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/turnos', turnos);
}