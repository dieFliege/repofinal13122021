const mongoose = require('mongoose');

const esquemaReporte = new mongoose.Schema({
    mes: {
        type: Number
    },
    turnosProgramados: {
        type: Number,
        default: 0
    },
    turnosAuxilio: {
        type: Number,
        default: 0
    },
    turnosCotizaciones: {
        type: Number,
        default: 0
    }
});

const Reporte = mongoose.model('Reporte', esquemaReporte);

exports.Reporte = Reporte;