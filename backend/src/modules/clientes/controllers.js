const db = require('../../DB/mysql');
const table = 'clientes';
// hacer peticiones de bse de datos
function getAll() {
    return db.all(table);
}
function getId(id) {
    return db.getId(table, id);
}
function update(data) {
    return db.putUpdate(table, data);
}
function deleteId(data) {
    return db.putDelete(table, data);
}

function insert(data) {
    return db.postInsert(table, data);
}
module.exports = {
    getAll,
    getId,
    update,
    deleteId,
    insert

}