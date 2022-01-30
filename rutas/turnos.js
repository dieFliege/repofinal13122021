const express = require('express');
const router = express.Router();

const herramienta = require('../herramientas/herramienta');

const {Turno, validar} = require('../modelos/turno');
const {Reporte} = require('../modelos/reporte');

const PROGRAMADO = 'programado';
const AUXILIO = 'auxilio';
const COTIZACION = 'cotizacion';

const COEFICIENTE_AUXILIO = 0.15;

router.get('/', async(req, res) => {
    const turnos = await Turno.find();
    res.send(turnos);
});

router.post('/', async(req, res) => {
    let { error } = validar(req.body);
    if(!error){
        const errorTurno = {errorMsg: ''};
        let turno = await Turno.findOne({ mes: req.body.mes, dia: req.body.dia, hora: req.body.hora });
        if(!turno){
            turno = new Turno({
                dia: req.body.dia,
                mes: req.body.mes,
                hora: req.body.hora,
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                servicio: req.body.servicio.toLowerCase()
            });
            let reporte = await Reporte.findOne({ mes: turno.mes });
            if(reporte){
                if(turno.servicio != AUXILIO){
                    if(herramienta.quedanTurnosDisponibles(turno.mes, reporte.turnosProgramados, reporte.turnosCotizaciones, COEFICIENTE_AUXILIO)){
                        reporte.turnosProgramados += herramienta.contarServicio(PROGRAMADO, turno.servicio);
                        reporte.turnosCotizaciones += herramienta.contarServicio(COTIZACION, turno.servicio);
                    } else {
                        errorTurno.errorMsg = 'ERROR. No quedan más turnos disponibles.';
                        res.status(400).send(errorTurno.errorMsg);
                    }
                } else {
                    if(herramienta.quedanTurnosParaAuxilio(mes, reporte.turnosAuxilio, COEFICIENTE_AUXILIO)){
                        reporte.turnosAuxilio += 1;
                    } else {
                        errorTurno.errorMsg = 'ERROR. No quedan más turnos para auxilio.';
                        res.status(400).send(errorTurno.errorMsg);
                    }
                }
            } else {
                reporte = new Reporte({
                    mes: turno.mes,
                    turnosProgramados: herramienta.contarServicio(PROGRAMADO, turno.servicio),
                    turnosAuxilio: herramienta.contarServicio(AUXILIO, turno.servicio),
                    turnosCotizaciones: herramienta.contarServicio(COTIZACION, turno.servicio)
                });
            }
            await turno.save();
            await reporte.save();
            res.send(turno);
        } else {
            errorTurno.errorMsg = 'ERROR. Este horario está ocupado.';
            res.status(400).send(errorTurno.errorMsg);      
        }
    } else {
        error.errMsg = error.details[0].message;
        res.status(400).send(error.errMsg);
    }
});

module.exports = router;