export function Tarjeta({ titulo, contenido }) {
  const div = document.createElement('div');
  div.className = 'tarjeta';
  
  const h3 = document.createElement('h3');
  h3.textContent = titulo;
  
  const text = document.createElement('input');
  text.type = 'text';
  text.value = contenido; // Corregido: sin comillas para usar el parámetro
  
  const del = document.createElement('button');
  del.textContent = 'Eliminar';
  
  div.appendChild(h3);
  div.appendChild(text);
  div.appendChild(del);
  
  return div;
}