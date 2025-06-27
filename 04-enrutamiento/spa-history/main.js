// Referencia al contenedor principal de la SPA
const app = document.getElementById('app');
// http://127.0.0.1:5500/04-enrutamiento/spa-history/index.html
// Definición de rutas y sus vistas asociadas
const routes = {
  '/': () => '<h1>Inicio</h1><p>Bienvenido a la SPA.</p>',
  '/productos': () => '<h1>Productos</h1><p>Lista de productos aquí.</p>',
  '/contacto': () => '<h1>Contacto</h1><p>Formulario de contacto aquí.</p>',
  '/producto': (params) => `<h1>El id es ${params}</h1>`
};

// Renderiza la vista correspondiente a la ruta actual
const render = route => {
  const parsed = route.match(/\/04-enrutamiento\/spa-history(.+)/)[1]
  const parts = parsed.match(/(\/[^\/]*)(?:\/(.+))?/)
  console.log(parts);
  app.innerHTML = routes[parts[1]] ? routes[parts[1]](parts[2]) : '<h1>404</h1><p>Página no encontrada.</p>';
};

// Cambia la ruta usando history.pushState y renderiza la nueva vista
const navigate = route => {
  window.history.pushState({}, '', route);
  render(route);
};

// Maneja los clics en la navegación para cambiar de vista sin recargar
// Usa delegación de eventos en el nav
// Actualiza la URL y la vista
//
document.getElementById('routesContainer').addEventListener('click', e => {
  if (e.target.matches('button[data-route]')) {
    navigate(e.target.dataset.route);
  }
});

// Maneja el evento popstate para soportar navegación con los botones del navegador
window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

const navContainer = document.getElementById('navigation');
navContainer.addEventListener('click', e => {
  console.log("so")
  if (e.target.id === "adelante") {
    window.history.forward();
  } else {
    window.history.back();
  }
});

// Render inicial según la ruta actual
render(window.location.pathname); 