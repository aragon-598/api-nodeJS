module.exports = app =>{
    const clientes = require("../controller/cliente.controller.js")

      // Create a new Customer
  app.post("/clientes/crear", clientes.create);

  // Retrieve all Customers
  app.get("/clientes/findAll", clientes.findAll);

  // Retrieve a single Customer with customerId
  app.get("/clientes/findById/:idCliente", clientes.findById);

  // Update a Customer with customerId
  app.put("/clientes/updateCliente/:idCliente", clientes.updateById);

  // Delete a Customer with customerId
  app.delete("/clientes/eliminarCliente/:idCliente", clientes.delete);

};