const express = require('express');
const config = require('./config');
const errors = require('./red/errors');
// const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cliente = require('./modules/clientes/rutas');
const error = require('./middleware/errs');
// middleware
// app.use(cors());


app.use(morgan('dev'));
// configuración de rutas
app.set('port', config.app.port);
//rutas
app.use("/api/clientes", cliente)
app.use(errors)
module.exports = app;