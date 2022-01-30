const mongoose = require('mongoose');
const Joi = require('joi');

const esquemaTurno = new mongoose.Schema({
    dia: {
        type: Number,
        min: 1,
        required: true
    },
    mes: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    hora: {
        type: Number,
        min: 0,
        max: 23,
        required: true
    },
    nombre: {
        type: String,
        trim: true,
        min: 1,
        required: true
    },
    telefono: {
        type: String,
        trim: true,
        min: 8,
        required: true
    },
    servicio: {
        type: String,
        trim: true,
        required: true
    }
});

const Turno = mongoose.model('Turno', esquemaTurno);

function validarTurno(turno){
    const esquemaValido = Joi.object({
        dia: Joi.number().min(1).required(),
        mes: Joi.number().min(1).max(12).required(),
        hora: Joi.number().min(0).max(23).required(),
        nombre: Joi.string().min(1).required(),
        telefono: Joi.string().min(8).regex(/^[0-9]*$/).required(),
        servicio: Joi.string().regex(/(programado|auxilio|cotizacion)$/i).required()
    });
    return esquemaValido.validate({
        dia: turno.dia,
        mes: turno.mes,
        hora: turno.hora,
        nombre: turno.nombre,
        telefono: turno.telefono,
        servicio: turno.servicio
    });
}

exports.Turno = Turno;
exports.validar = validarTurno;