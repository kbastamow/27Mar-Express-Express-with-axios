const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors") //I need cors to be able to access API through axios
// const corsOptions = {  //Trying to define access only to liveserver, didn´t work
//   origin: "http://127.0.0.1:5500/",
//   optionsSuccessStatus: 200 
// }
app.use(cors()); //GIVES open access to all

const items = [
  { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
  { id: 2, nombre: 'FIFA 22 PS5' , precio: 1000},
  {  id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
  {  id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200},
  {  id: 5,  nombre: 'Skin Valorant' , precio: 120},
  {  id: 6, nombre: 'Taza de Star Wars' , precio: 220}
]

// ●	Al llamar a localhost se debe mostrar el siguiente 

app.get("/productos", (req, res) =>{
   res.send({description: "products", items});   //res.send can only display one thing, for more, use an object!
})

// ●	Crear endpoint para poder crear un producto nuevo
app.post("/productos", (req, res) => {
  const newProduct = {
    id: items.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  };
  if (!(req.body.nombre || req.body.precio)) {
    res.status(400).send("Completa todos los campos");   //status code 400 : bad request
  } else {
    items.push(newProduct);
    res.send(items);
  }
})

app.put("/productos/id/:id", (req, res) => {
  const found = items.some(item => item.id == req.params.id); //only two == because the parameter is always a string!!
  console.log(found);
  if (found) {
    items.forEach(item => {
      if (item.id == req.params.id) {
        item.nombre = req.body.nombre,
        item.precio = req.body.precio
        res.send({item, items});   //Show the updated Item + all the updated array
      }
    })
  } else {
    res.status(404).send(`Item número ${req.params.id} no existe`)
  }
})
    
// ●	Crear endpoint para poder eliminar un producto
app.delete("/productos/id/:id", (req, res) => {
  const found = items.some(item => item.id === +req.params.id); //type and value match - "+" turns string into number. Alt to ==
  if (found) {
    const index = items.findIndex(product => product.id === +req.params.id);
    items.splice(index, 1)  //deletes the item  
    res.send(items);
    } else {
      res.status(404).send(`Item número ${req.params.id} no se encuentra`)
    }
  });

  // ●	Crear filtro por precio de producto  -  // Specify min and max. THIS IS THE FORMAT OF THE SEARCH TERM :   ?floor=20&ceil=80
  app.get("/productos/precio/search", (req, res) => {
    const floor = req.query.floor;
    const ceil = req.query.ceil;
    res.send(items.filter(product => product.precio >= +floor && product.precio <= +ceil)); 
  })


  // ●	Crear filtro que muestre los productos con un precio entre 50 y 250.
  app.get("/productos/precio", (req, res) => {
    const filteredPrices = items.filter(product => product.precio >= 50 && product.precio <= 250)
    res.send({rango_de_precios:"50-250", filteredPrices}); 
  })

  // ●	Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto
  app.get("/productos/id/:id", (req, res) => {
    if (items.some(item => item.id === +req.params.id)) {
      res.send(items.filter(item => item.id === +req.params.id))
    } else {
      res.send(`Item número ${req.params.id} no se encuentra`);
    }
  })

  // ●	Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto
    app.get("/productos/nombre/:nombre", (req, res) => {
    console.log(req.params.nombre.toLowerCase());
    console.log(items[1].nombre.toLowerCase());
    if (items.some(item => item.nombre.toLowerCase() == req.params.nombre.toLowerCase())) {
      res.send(items.filter(item => item.nombre.toLowerCase() == req.params.nombre.toLowerCase()))  
    } else {
      res.send(`Item "${req.params.nombre}" no se encuentra`);
    }
  })  
  
  
app.listen("8080", () => {
  console.log("Server started on port 8080 with cors() enabled");
})