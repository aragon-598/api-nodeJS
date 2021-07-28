const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//ruta sencilla

app.get("/",(req,res)=>{
    res.json({mensaje:"Hola mundo del API en nodejs"});
});

require("./app/routes/cliente.routes.js")(app)

app.listen(3000, () =>{
    console.log("Server running in port 3000");
});