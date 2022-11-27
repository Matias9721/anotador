import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addtask = (evento) => {
    evento.preventDefault();

    const list = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const calendar = document.querySelector('[data-form-date]');

    const value = input.value;
    const date =calendar.value;    
    const dateFormat =moment(date).format("DD/MM/YYYY");
    const horaFormat = moment(date).format("LT");

    if (value == '' || date == ''){
        return;
    }

    input.value = '';
    calendar.value= '';

    const complete = false;

    const taskObj  = {
        value,
        dateFormat,
        horaFormat,
        complete,
        id : uuid.v4()
    };

    list.innerHTML ='';

    const taskList = JSON.parse(localStorage.getItem("task")) || [];
    taskList.push(taskObj);
    localStorage.setItem('task', JSON.stringify(taskList));

    displayTasks();
};

export const createTask = ({value,horaFormat,complete,id }) => {
    const task = document.createElement('li');
    task.classList.add('card');
    const taskContent = document.createElement('div');

    const check = checkComplete(id)

    if (complete){
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far'); 
    }

    const titleTask = document.createElement('span');
    titleTask.classList.add('task');
    titleTask.innerText = value;
    taskContent.appendChild(check);
    taskContent.appendChild(titleTask);

    const horaElement = document.createElement('span');
    horaElement.innerHTML = horaFormat;
    
    task.appendChild(taskContent);
    task.appendChild(horaElement);
    task.appendChild(deleteIcon(id));
    return task;

};
