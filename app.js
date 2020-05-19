const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const path = require('path');
const expressValidator = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const helmet = require('helmet');
const morgan = require('morgan');

//Initialisation of the app
const app = express();

mongoose
  .connect(
    process.env.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.UI_URI);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

//Configuration of the application
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan('combined'));
app.use(
  session({
    secret: 'Find_Your_Sauce_Sopekocko',
    name: 'userSession',
    cookie: {
      maxAge: 60000,
      secure: true,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;