const mysql = require("mysql");
const dbConfig = require("../config/db.config.js")

//Creando conexión
const conexion = mysql.createConnection({
    host:dbConfig.HOST,
    user: dbConfig.USERDB,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//Verificando conexión

conexion.connect(error => {
    if (error) throw error;
    console.log(`Conexión exitosa a la DB ${dbConfig.DB} con el usuario ${dbConfig.USERDB}`);
});

module.exports = conexion;
