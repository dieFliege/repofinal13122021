function contarServicio(servicio, servicioCargado){
    return (servicio === servicioCargado) ? 1 : 0;
}

function totalTurnosMes(mes){
    const HORAS = 24;
    let totalTurnosMes;
    if(mes == 4 || mes == 6 || mes == 9 || mes == 11){
        totalTurnosMes = HORAS * 30;
    } else if(mes == 2){
        totalTurnosMes = HORAS * 28;
    } else {
        totalTurnosMes = HORAS * 31;
    }
    return totalTurnosMes;
}

function quedanTurnosDisponibles(mes, turnosProgramados, turnosCotizaciones, coeficienteAuxilio){
    return (totalTurnosMes(mes) * (1-coeficienteAuxilio) > turnosProgramados + turnosCotizaciones) ? true : false;
}

function quedanTurnosParaAuxilio(mes, turnosAuxilio, coeficienteAuxilio){
    return (totalTurnosMes(mes) * coeficienteAuxilio > turnosAuxilio) ? true : false;
}

module.exports.contarServicio = contarServicio;
module.exports.quedanTurnosDisponibles = quedanTurnosDisponibles;
module.exports.quedanTurnosParaAuxilio = quedanTurnosParaAuxilio;