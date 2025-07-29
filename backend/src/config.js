require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3000,
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'tour_db',
    },
};
