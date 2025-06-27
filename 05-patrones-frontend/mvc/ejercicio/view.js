import { Tarjeta } from "./componentes/tarjeta.js";
import { Formulario } from "./componentes/formulario.js";

// Vista: Se encarga de la presentación y la interacción con el usuario
export class TaskView {
  constructor() {
    // Referencias a los elementos del DOM
    this.list = document.getElementById('task-list');
    this.formContainer = document.getElementById('formContainer');
    this.form = Formulario()
    this.formContainer.appendChild(this.form); // Agrega el formulario al contenedor
    this.input = document.getElementById('task-input');
    this.tarjetaList = []
  }

  // Renderiza la lista de tareas en el DOM
  render(tasks) {
    this.list.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      const t = Tarjeta({
        titulo: `Tarea ${idx + 1}`,
        contenido: task
      })
      li.appendChild(t);
      this.tarjetaList.push(t);
      this.list.appendChild(li);
    });
  }

  // Asocia el evento de agregar tarea al formulario
  bindAddTask(handler) {
    this.form.onsubmit = e => {
      e.preventDefault();
      handler(this.input.value); // Llama al controlador con el valor ingresado
      this.input.value = '';
    };
  }

  bindRemoveTask(handler) {
    this.tarjetaList.forEach((tarjeta, idx) => {
      tarjeta.querySelector('button').onclick = () => {
        handler(idx); // Llama al controlador con el índice de la tarea
      };
    });
  }

  bindEditTask(handler) {
    this.tarjetaList.forEach((tarjeta, idx) => {
      const input = tarjeta.querySelector('input[type="text"]');
      input.onchange = () => {
        handler(idx, input.value); // Llama al controlador con el índice y el nuevo valor
      };
    });
  }
} 