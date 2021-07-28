const sql = require("./db.js");

/**
 * Constructor
 * @param {*} cliente 
 */
const Cliente =  function (cliente) {
    this.email = cliente.email;
    this.nombre = cliente.nombre;
    this.activo = cliente.activo;
};

/**
 * Método para crear un nuevo cliente
 * @param {*} nuevoCliente 
 * @param {*} result 
 */
Cliente.create = (nuevoCliente, result) =>{
    sql.query("INSERT INTO clientes SET ?",nuevoCliente,(err,res)=>{
        if (err) {
            console.log("ERROR: ",err);
            result(err, null);
            return;
        }

        console.log("Cliente creado ",{id:res.insertId, ...nuevoCliente});
        result(null,{id:res.insertId, ...nuevoCliente}  )
    });
};

/**
 * 
 * @param {id del cliente a buscar} idCliente 
 * @param {*} result 
 */
Cliente.findById = (idCliente,result) =>{
    sql.query(`SELECT * from clientes WHERE id_cliente = ${idCliente}`, (err,res)=>{
        if (err) {
            console.log("ERROR : ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Cliente encontrado: ",res[0]);
            result(null,res[0]);
            return;
        }

        //Si no existe el cliente
        result({kind:"Not Found"}, null);
    });
};

/**
 * Busca todos los registros en la tabla
 * @param {*} result 
 */
Cliente.findAll = result =>{
    sql.query("SELECT * from clientes", (err,res)=>{
        if (err) {
            console.log("ERROR : ",err);
            result(null,err);
            return;
        }

        console.log("clientes", res);
        result(null, res)
    });
};

/**
 * Método para actualizar datos mediante el ID
 * @param {*} id 
 * @param {*} cliente 
 * @param {*} result 
 */
Cliente.updateById = (id, cliente,result)=>{
    sql.query(
    "UPDATE clientes SET email = ?, nombre = ?, activo = ? WHERE id_cliente = ?",
    [cliente.email, cliente.nombre, cliente.activo, id], 
    
    (err, res) =>{
        if (err) {
            console.log("ERROR: ",err);
            result(null,err);
            return;
        }

        if (res.affectedRows == 0) {
            //No existe el cliente con ese id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Cliente actualizado ",{id:id,...cliente});
        result(null,{id:id,...cliente});
    });
};

/**
 * método para eliminar clientes por ID
 * @param {*} id 
 * @param {*} result 
 */
Cliente.removeById = (id,result)=>{
    sql.query("DELETE from clientes WHERE id_cliente = ?",id,(err,res)=>{
        if (err) {
            console.log("ERROR: ",err);
            result(null,err);
            return;
        }

        if (res.affectedRows == 0) {
            //No está registrado o no existe el id
            result({kind:"NOT FOUND"},null);
            return;
        }

        console.log("Eliminado el cliente con ID: ", id);
        result(null, res);
    });
};

module.exports = Cliente;