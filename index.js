// config inicial
const express = require('express')
const app = express()

// depois do db
const mongoose = require('mongoose')
const Dispositivo = require('./models/Dispositivos')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/dispositivos', async (req, res) => {
  const { nome, especificacoes } = req.body

  if(!nome){
    res.status(422).json({error: 'O nome é obrigatório'})
  }

  if(!especificacoes){
    res.status(422).json({error: 'As especificações são obrigatórias'})
  } 

  const dispositivo = {
    nome,
    especificacoes,
  }

  try {
    await Dispositivo.create(dispositivo)

    res.status(201).json({ message: 'Dispositivo inserido no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/dispositivos', async (req, res) => {
  try {
    const dispositivos = await Dispositivo.find()

    res.status(200).json(dispositivos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/dispositivos/:id', async (req, res) => {
  const id = req.params.id

  try {
    const dispositivos = await Dispositivo.findOne({ _id: id })

    if (!dispositivos) {
      res.status(422).json({ message: 'Dispositivo não encontrado!' })
      return
    }

    res.status(200).json(dispositivos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
}) 

app.patch('/dispositivos/:id', async (req, res) => {
  const id = req.params.id

  const { nome, especificacoes } = req.body

  const dispositivos = {
    nome,
    especificacoes
  }

  try {
    const updatedDispositivos = await Dispositivo.updateOne({ _id: id }, dispositivos)

    if (updatedDispositivos.matchedCount === 0) {
      res.status(422).json({ message: 'Dispositivo não encontrado!' })
      return
    }

    res.status(200).json(dispositivos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/dispositivos/:id', async (req, res) => {
  const id = req.params.id

  const dispositivos = await Dispositivo.findOne({ _id: id })

  if (!dispositivos) {
    res.status(422).json({ message: 'Dispositivo não encontrado!' })
    return
  }

  try {
    await Dispositivo.deleteOne({ _id: id })

    res.status(200).json({ message: 'Dispositivo removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose
  .connect(
    'mongodb+srv://matheus:q0RPw633TgcpqBhv@apicluster.vj5rqzi.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))


  // q0RPw633TgcpqBhv

  // mongodb+srv://matheus:q0RPw633TgcpqBhv@apicluster.vj5rqzi.mongodb.net/?retryWrites=true&w=majority

  const Eventos = require('./models/Eventos')
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(express.json())
  

app.post('/eventos', async (req, res) => {
  const { tipo, dispos } = req.body

  if(!tipo){
    res.status(422).json({error: 'O nome é obrigatório'})
  }

  if(dispos){
    res.status(422).json({error: 'O Dispositivo é obrigatório'})
  } 
  const id = req.params.id
  try {
    const dispositivos = await Dispositivo.findOne({ dispos: id })

    if (!dispositivos) {
      res.status(422).json({ message: 'Dispositivo não encontrado!' })
      return
    }
  } catch (error) {
    res.status(500).json({ erro: error })
  }
  
  const eventos = {
    tipo,
    dispos,
  }

  try {
    await Eventos.create(eventos)

    res.status(201).json({ message: 'Dispositivo inserido no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Eventos.find()

    res.status(200).json(eventos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})
