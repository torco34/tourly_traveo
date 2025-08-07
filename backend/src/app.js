const express = require('express');
const config = require('./config');
// const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cliente = require('./modules/clientes/rutas');
// middleware
// app.use(cors());


app.use(morgan('dev'));
// configuración de rutas
app.set('port', config.app.port);
//rutas
app.use("/api/clientes", cliente)

module.exports = app;