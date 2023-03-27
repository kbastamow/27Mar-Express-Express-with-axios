// ●	Crear un archivo con el nombre e1.js
// ●	Levantar un servidor utilizando Express, al levantar el servidor tiene que mostrar un mensaje que diga: 
// ○	`Servidor levantado en el puerto ${puerto}`.



const express = require("express"); //import express
const app = express();  //initiate express

app.listen("8080", () => {
  console.log("Server started on port 8080");
});
