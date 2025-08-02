const db = require('../../DB/mysql');
const table = 'clientes';
// hacer peticiones de bse de datos
function getAll() {
    return db.all(table);
}
function getId() {
    return db.all(table, id);
}
module.exports = {
    getAll,
    getId
}