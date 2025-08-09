const respuesta = require('./respuesta');
function errors(err, req, res, next) {
    console.error('[error]', err);
    const message = err.message || 'Error interno del servidor';
    const status = err.statusCode || 500;
    return respuesta.error(req, res, message, status, err);
    //   if (err.name === 'CastError') {
    //     return respuesta.error(req, res, 'Error de conversión de tipo', 400, err);
    //   }
    //   if (err.name === 'ValidationError') {
    //     return respuesta.error(req, res, 'Error de validación', 400, err);
    //   }
    //   if (err.name === 'MongoError' && err.code === 11000) {
    //     return respuesta.error(req, res, 'Error de duplicación de clave', 400, err);
    //   }
}
module.exports = errors;