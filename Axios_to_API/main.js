const API_URL = "http://localhost:8080/productos";
const btn = document.getElementById("btn")
const addBtn = document.getElementById("addBtn")
const productList = document.getElementById("productList")
const firstDiv = document.getElementById("firstDiv")
const formDiv = document.getElementById("formDiv")
const form = document.getElementById("form")


function showProducts(array) {
  array.forEach(product => {
    let entity = document.createElement("div");
    entity.setAttribute("class", "card");
    entity.innerHTML = `<div class="card-header h5">${product.nombre}</div>
                        <div class="card-body">Precio: ${product.precio}€</div>
                        <div class="card-footer">Id de producto: ${product.id}</div><br>`
    productList.appendChild(entity);
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-dark")
    deleteBtn.setAttribute("value", product.id) //to be used in delete
    deleteBtn.innerText = "Elimina este producto";
    deleteBtn.addEventListener("click", deleteProduct);
    entity.appendChild(deleteBtn)
    
  })
}

function clearDisplay(){
  while (productList.firstChild){
    productList.removeChild(productList.firstChild);
  }
}

function displayForm(e) {
  e.preventDefault();
  formDiv.classList.remove("hide");

}

async function accessData(e){ 
  try {
    e.preventDefault();
    clearDisplay()
    const res = await axios.get(API_URL);
    const items = res.data.items;
    showProducts(items);
  } catch (err) {
    console.error(err);
  }
}

async function deleteProduct(e) {
  try {
    e.preventDefault();
    const res = await axios.delete(API_URL + "/id/" + this.value)
    accessData(e);
  } catch(err){
    console.error(err);
  }
}

async function addProduct(e){
  try {
  e.preventDefault();
  const newName = document.getElementById("newName");
  const newPrice = document.getElementById("newPrice");
  const res = await axios.post(API_URL, {
    nombre: newName.value,   //Object key must be the same as the last word after req.body.THISWORD in API
    precio: newPrice.value
  })
  formDiv.classList.add("hide");
  accessData(e);
  } catch (err) {
    console.error(err);
  }
}


addBtn.addEventListener("click", displayForm)
btn.addEventListener("click", accessData)
form.addEventListener("submit", addProduct);