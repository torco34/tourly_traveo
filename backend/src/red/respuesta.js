// src/red/respuesta.js
exports.success = function (req, res, data, status = 200) {
    return res.status(status).send({
        error: false,
        status,
      message: data
  });
};

exports.error = function (req, res, message = 'error interno', status = 500) {
    return res.status(status).send({
        error: true,
        status: status,
        message: message
    });
};
