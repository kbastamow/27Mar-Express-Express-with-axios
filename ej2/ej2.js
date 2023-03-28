const express = require("express");
const app = express();
app.use(express.json())

// ○	Ruta: Productos, Método: get, Acción: Mostrar un mensaje que diga: listado de productos
// ○	Ruta: Productos, Método: post, Acción: Mostrar un mensaje que diga: crear un producto
// ○	Ruta: Productos, Método: put, Acción: Mostrar un mensaje que diga: actualizar un producto
// ○	Ruta: Productos, Método: delete, Acción: Mostrar un mensaje que diga: borrar un producto
// ○	Ruta: Usuarios, Metodo: get, Acción: Mostrar un mensaje que diga: listado de usuarios
// ○	Ruta: Usuarios, Método: post, Acción: Mostrar un mensaje que diga: crear un usuario
// ○	Ruta: Usuarios, Metodo: put, Acción: Mostrar un mensaje que diga: actualizar un usuario
// ○	Ruta: Usuarios, Metodo: delete, Acción: Mostrar un mensaje que diga: borrar un usuario
// ○	Utilizar Postman para probar todos los llamados

app.get("/", (req, res) => {
  res.send("Welcome!")
});

app.get("/products", (req, res) => {
  res.send("Product list")
});

app.post("/products", (req, res) => {
  res.send("Create a product")
});

app.put("/products", (req, res) => {
  res.send("Update a product")
});

app.delete("/products", (req, res) => {
  res.send("Delete a product")
});



app.get("/users", (req, res) => {
  res.send("User list")
})

app.post("/users", (req, res) => {
  res.send("Create a user")
})

app.put("/users", (req, res) => {
  res.send("Update a user")
})

app.delete("/users", (req, res) => {
  res.send("Delete a user")
})

app.listen("8080", () => {
  console.log("Server started on port 8080");
});
