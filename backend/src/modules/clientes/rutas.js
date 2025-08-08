const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuesta');
const controller = require('./controllers');
// Define las rutas
router.get('/', getAll)
router.get('/:id', getId)
router.put('/:id', updateCliente)
router.delete('/:id', deleteCliente);
router.post('/', createCliente);
async function getAll(req, res) {
    try {
        const clientes = await controller.getAll();
        respuesta.success(req, res, clientes, 200);
    } catch (err) {
        console.error('Error en GET /:', err);
        respuesta.error(req, res, 'No se pudieron obtener los clientes', 500);
    }
}
async function getId(req, res) {
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
}
async function updateCliente(req, res) {
    try {
        console.log('req.body:', req.body);
        const data = {
            id: req.params.id,
            ...req.body
        };
        console.log('Datos recibidos en PUT /clientes/:id =>', data);
        const cliente = await controller.update(data);
        if (!cliente) {
            return respuesta.error(req, res, 'Cliente no encontrado', 404);
        }
        respuesta.success(req, res, cliente, 200);
    } catch (err) {
        console.error('Error en PUT /:id:', err);
        respuesta.error(req, res, 'No se pudo actualizar el cliente', 500);
    }
}

async function deleteCliente(req, res) {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: true, message: 'ID es requerido' });
        }

        const resultado = await controller.deleteId(id); // ← solo pasar el ID

        res.status(200).json({
            error: false,
            status: 200,
            message: resultado
        });

    } catch (err) {
        console.error('Error en DELETE /:id:', err);
        res.status(500).json({
            error: true,
            status: 500,
            message: 'Error al eliminar el cliente'
        });
    }
}
async function createCliente(req, res) {
    const data = req.body;

    try {
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: true, message: 'Datos del cliente requeridos' });
        }

        const resultado = await controller.insert(data);
        res.status(201).json({
            error: false,
            status: 201,
            message: resultado
        });

    } catch (err) {
        console.error('Error en POST /clientes:', err);
        res.status(500).json({ error: true, message: 'Error al insertar cliente' });
    }
}

module.exports = router;