// Módulo de tareas usando ES6+
// Provee funciones para obtener, agregar y eliminar tareas usando localStorage

const STORAGE_KEY = 'tasks'; // Clave para localStorage

// Devuelve la lista de tareas almacenadas
export function getTasks() {
  const x = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return x
}

// Agrega una tarea nueva y la guarda en localStorage
export function addTask(task) {
  const tasks = getTasks();
  tasks.push({name: task, completed: false});
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Elimina una tarea por índice y actualiza localStorage
export function removeTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function editTask(index, param, newVal) {
  const tasks = getTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index][param] = newVal;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}