const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuesta');
const controller = require('./controllers');
router.get('/', async function (req, res) {
    try {
        const clientes = await controller.getAll();
        respuesta.success(req, res, clientes, 200);
    } catch (err) {
        console.error('Error en GET /:', err);
        respuesta.error(req, res, 'No se pudieron obtener los clientes', 500);
    }
});
router.get('/:id', async function (req, res) {
    try {
      const cliente = await controller.getId(req.params.id);
      if (!cliente) {
          return respuesta.error(req, res, 'Cliente no encontrado', 404);
      }
      respuesta.success(req, res, cliente, 200);
  } catch (err) {
      console.error('Error en GET /:id:', err);
      respuesta.error(req, res, 'No se pudieron obtener los clientes', 500);
  }
});
module.exports = router;