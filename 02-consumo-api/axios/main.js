// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL); // Realiza una petición GET
    const products = res.data; // Axios retorna los datos en la propiedad 'data'
    list.innerHTML = '';
    products.forEach(prod => {
      const li = document.createElement('li');
      
      const clickable = document.createElement('div');
      clickable.textContent = `${prod.name} - $${prod.price}`;
      clickable.onclick = () => alert(`Detalles del producto: ${prod.name}\nPrecio: $${prod.price}\nDescripción: ${prod.description}\nID: ${prod.id}`);
      clickable.classList = ["clickable"];

      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);
      // Crea el botón de eliminar y llama a deleteProduct
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = e => {
        e.stopPropagation(); // Evita que se dispare el evento de detalles
        deleteProduct(prod.id).then(fetchProducts);
      };
      li.appendChild(clickable);
      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    alert('Error al obtener productos');
  }
}

// EJERCICIO 1: Crear producto
// Completa esta función para enviar los datos del formulario usando axios POST
async function createProduct(name, price, description) {
  try {
    const product = { name, price, description };
    await axios.post(BASE_URL, product); // Realiza una petición POST
  } catch (err) {
    alert('Error al crear el producto');
  }
}

// EJERCICIO 2: Eliminar producto
// Completa esta función para eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`); // Realiza una petición DELETE
  } catch (err) {
    alert('Error al eliminar el producto');
  }
}

// EJERCICIO 3: Ver detalles de producto
// Completa esta función para mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`); // Realiza una petición GET
    const product = res.data; // Axios retorna los datos en la propiedad 'data'
  } catch (err) {
    alert('Error al obtener los detalles del producto');
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  // Llama a la función de crear producto
  await createProduct(name, price, description);
  form.reset();
  fetchProducts();
};

// Llama a la función para mostrar los productos al cargar la página
fetchProducts(); 