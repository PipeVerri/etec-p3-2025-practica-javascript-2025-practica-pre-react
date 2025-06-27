export function Formulario() {
    const form = document.createElement('form');
    form.id = 'task-form';
    const input = document.createElement('input');
    input.id = 'task-input';
    input.type = 'text';
    input.placeholder = 'Nueva tarea';
    input.required = true;
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Agregar';
    form.appendChild(input);
    form.appendChild(button);
    return form;
}