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
async function getAll(req, res, next) {
    try {
        const clientes = await controller.getAll();
        respuesta.success(req, res, clientes, 200);
    } catch (err) {
        next(err); 
    }
}
async function getId(req, res, next) {
    try {
      const cliente = await controller.getId(req.params.id);
      if (!cliente) {
          return respuesta.error(req, res, 'Cliente no encontrado', 404);
      }
      respuesta.success(req, res, cliente, 200);
  } catch (err) {
        next(err); 
  }
}
async function updateCliente(req, res, next) {
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
        next(err); 
    }
}

async function deleteCliente(req, res, next) {
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
        next(err); 
    }
}
async function createCliente(req, res, next) {
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
        next(err); 

    }
}

module.exports = router;