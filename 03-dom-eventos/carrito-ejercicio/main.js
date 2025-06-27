// Referencias a los elementos del DOM
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const emptyCartBtn = document.getElementById('empty-cart');
const cartSummary = document.getElementById('cart-summary');

// Estado del carrito (array de productos)
let cart = [];
let total = 0;

// Renderiza el carrito en el DOM y muestra el resumen
const renderCart = () => {
  cartList.innerHTML = '';
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;

    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.classList.add('remove');
    btn.dataset.id = item.id;

    // TODO: Agrega aquí el botón y la lógica para eliminar el producto del carrito
    li.appendChild(btn);
    cartList.appendChild(li);
  });
  // TODO: Calcula y muestra el total y la cantidad de productos
  cartSummary.textContent = `Total: $${total} | Productos: ${cart.length}`;
};

// Maneja el evento de agregar productos al carrito usando delegación de eventos
productList.addEventListener('click', e => {
  if (e.target.classList.contains('add')) {
    const li = e.target.closest('li');
    const { id, name, price } = li.dataset;
    cart.push({ id, name, price });
    total += parseFloat(price);
    renderCart();
  }
});

cartList.addEventListener('click', e => {
  if (e.target.classList.contains('remove')) {
    const id = e.target.dataset.id;
    // Encuentra el índice del producto a eliminar
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      // Elimina el producto del carrito y actualiza el total
      total -= parseFloat(cart[index].price);
      cart.splice(index, 1);
      renderCart();
    }
  }
})

emptyCartBtn.addEventListener('click', e => {
  // Vacía el carrito y actualiza la vista
  cart = [];
  console.log("so")
  renderCart();
})

// TODO: Maneja el evento de eliminar productos del carrito usando delegación de eventos
// cartList.addEventListener(...)

// TODO: Maneja el evento de vaciar el carrito
// emptyCartBtn.addEventListener(...)

// Render inicial del carrito
renderCart(); 