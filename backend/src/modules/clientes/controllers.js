const db = require('../../DB/mysql');
const table = 'clientes';
// hacer peticiones de bse de datos
function getAll() {
    return db.all(table);
}

module.exports = {
    getAll
}