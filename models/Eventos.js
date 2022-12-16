const mongoose = require('mongoose')
const Dispositivos = require('./Dispositivos')
const Eventos = mongoose.model('Eventos', {
    tipo: String, 
    dispositivos: Dispositivos.schema,
}) 

module.exports = Eventos
