const Cliente = require("../models/clientes.model.js");

/**
 * Creando y guardando nuevo cliente
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) =>{
    if (!req.body) {
        res.status(400).send({
            mensaje:"No se permiten objetos vacíos"
        });
    }

    const client = new Cliente({
        email: req.body.email,
        nombre: req.body.nombre,
        activo: req.body.activo
    });

    Cliente.create(client,(err,data)=>{
        if (err) {
            res.status(500).send({
                mensaje: err.message || "Algo salió mal al intentar crear al cliente"
            });
        }

        else res.send(data);
    });
};

/**
 * Método para obtener todos objetos
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = (req, res) =>{
    Cliente.findAll((err,data)=>{
        if (err) {
            res.status(500).send({
                mensaje: err.message || "Algo salió mal al intentar obtener los datos"
            });
        } else {
            res.send(data);
        }
    });
};

/**
 * Busca e imprime un objeto por su id
 * @param {*} req 
 * @param {*} res 
 */
exports.findById = (req, res)=>{
    Cliente.findById(req.params.idCliente, (err,data)=>{
        if (err) {
            if (err.kind ==="Not Found") {
                res.status(404).send({
                    message: `No se encontro al cliente con ID ${req.params.idCliente}.`
                  });
            }
        } else {
            res.send(data);
        }
    });
};

/**
 * Actualizar objetos mediante su ID
 * @param {*} req 
 * @param {*} res 
 */
exports.updateById = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "No se admiten peticiones vacías"
        });
    }

    Cliente.updateById(req.params.idCliente,new Cliente(req.body), (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encuentra al cliente con ID ${req.params.idCliente}.`
                  });
            }
            else {
                res.status(500).send({
                  message: "Error updating Customer with id " + req.params.idCliente
                });
              }
        }else{
            res.send(data);
        }
    });
};

/**
 * Eliminar objetos mediando su ID
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
    Cliente.removeById(req.params.idCliente, (err, data) => {
      if (err) {
        if (err.kind === "NOT FOUND") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.idCliente}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.idCliente
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };