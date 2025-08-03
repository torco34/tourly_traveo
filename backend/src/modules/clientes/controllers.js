const db = require('../../DB/mysql');
const table = 'clientes';
// hacer peticiones de bse de datos
function getAll() {
    return db.all(table);
}
function getId(id) {
    return db.getId(table, id);
}
module.exports = {
    getAll,
    getId
}