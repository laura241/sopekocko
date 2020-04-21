const express = require('express')
const bodyParser = require('body-parser')
const saucesRoutes = require('./routes/sauces');
const mongoose = require('mongoose')
mongoose
  .connect(
    'mongodb+srv://laura:PekockoSoProject20@cluster0-lbilb.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use('/api/', saucesRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use((req, res, next) => {
  res.json({
    message: 'Votre requête a bien été reçue',
  })
  next()
})

app.use(bodyParser.json())

module.exports = app