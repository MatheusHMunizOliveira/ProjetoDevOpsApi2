const mongoose = require('mongoose')

const Dispositivos = mongoose.model('Dispositivos', {
  nome: String,
  especificacoes: String,
})

module.exports = Dispositivos
