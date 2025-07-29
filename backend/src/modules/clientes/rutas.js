const express = require('express');
const router = express.Router();
const repuesta = require('../../red/respuesta');
const controller = require('./controllers');
router.get('/', function (req, res) {
    const todos = controller.getAll()

    repuesta.success(res, todos);
});
module.exports = router;