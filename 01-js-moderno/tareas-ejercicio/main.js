// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask, editTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const filter = document.getElementById('filter');

let filterVal = "all"
// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  getTasks().reverse().forEach((task, idx) => {
    const {name, completed} = task;
    if (filterVal === "completed" && !completed) return;
    if (filterVal === "todo" && completed) return;

    const true_idx = idx - getTasks().length + 1; // Ajusta el índice para mostrar tareas en orden invers
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };

    const txtInput = document.createElement("input");
    txtInput.type = "text";
    txtInput.value = task["name"];
    txtInput.onchange = () => {
      editTask(true_idx, txtInput.value);
    };

    const checked = document.createElement("input");
    checked.type = "checkbox";
    checked.checked = task["completed"];
    checked.onchange = () => {
      editTask(true_idx, "completed", checked.checked);
      renderTasks();
    };

    li.appendChild(txtInput);
    li.appendChild(checked);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
  renderTasks();
};

filter.onchange = () => {
  const filterValue = filter.value;
  filterVal = filterValue;
  renderTasks();
}

// Render inicial de las tareas
renderTasks(); 