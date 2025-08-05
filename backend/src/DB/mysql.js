const mysql = require('mysql2');
const config = require('../config');

let connection; // ← ¡IMPORTANTE! Definir esto afuera

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

function createMysql() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.log('[Error connecting to the database:]', err);
            setTimeout(createMysql, 2000);
        } else {
            console.log('Connected to the MySQL database');
        }
    });

    connection.on('error', (err) => {
        console.log('[Database error:]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            createMysql();
        } else {
            throw err;
        }
    });
}

createMysql();

function all(tabla) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}
function getId(tabla, id) {
    return new Promise((resolve, reject) => {
      connection.query(
          `SELECT * FROM ${tabla} WHERE id = ?`,
          [id],
          (err, results) => {
              return err ? reject(err) : resolve(results[0]); // si no hay, será undefined

          }
      );
    });
}
// Función para eliminar un cliente
function putDelete(tabla, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE  FROM ${tabla} WHERE id = ?`,
            data.id,
            (err, results) => {
                return err ? reject(err) : resolve(results[0]); // si no hay, será undefined

        }
    );
  });
}
module.exports = {
    all,
    getId,
    putDelete
};
