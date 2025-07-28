const express = require('express');
const router = express.Router();
router.get('/', function (req, res) {
    res.send('Clientes API is working');
});
module.exports = router;