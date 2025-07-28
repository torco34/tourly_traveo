const express = require('express');
const config = require('./config');
const app = express();
const cliente = require('./modules/clientes/rutas');
// configuración de rutas
app.set('port', config.app.port);
//rutas
app.use("/api/cliente", cliente)
app
module.exports = app;