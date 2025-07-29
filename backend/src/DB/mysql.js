const mysql = require('mysql2');
const config = require('../config');

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};
let retryCount = 0;
const MAX_RETRIES = 5;

function createMysql() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.log('[Error connecting to the database:]', err);
            retryCount++;
            if (retryCount <= MAX_RETRIES) {
                setTimeout(createMysql, 2000); // Reintento
            } else {
                console.error('Max retries reached. Exiting MySQL connection attempts.');
            }
            return;
        }

        console.log('Connected to the MySQL database');
        retryCount = 0; // reset on success
    });

    connection.on('error', (err) => {
        console.log('[Database error:]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            createMysql();
        } else {
            console.error('Fatal DB error:', err);
        }
    });
}


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

module.exports = {
    all,
};
