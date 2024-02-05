console.log('JS is sourced!');
let todos = [];
getTasks();
// refreshTasks();
function submitTask(event) {
    event.preventDefault();
    console.log('Submit clicked')
    let task = document.getElementById('task').value;
    // console.log(task)
    // let isComplete = document.getElementById('isComplete').value;
    let newTask = {
        task: task,
        // isComplete: isComplete
    }
    console.log('new task', newTask);
    addTask(task);
};

function addTask(taskToAdd) {
    axios({
        method: 'POST',
        url: '/todos',
        data: { text: taskToAdd },
    })
        .then(function (response) {
            console.log('addTask()', response.data)
            const newTask = {
                text: response.data.text,
                isComplete: response.data.isComplete
            };
            todos.push(newTask);
            refreshTasks();
            getTasks();
        })
        .catch(function (error) {
            console.log('error in POST', error)
            alert('add task failed');
        })
}

function getTasks() {
    axios({
        method: 'GET',
        url: '/todos'
    })
        .then(function (response) {
            console.log('refreshTasks() response', response.data);
            todos = response.data;
            refreshTasks();

        })
        .catch(function (error) {
            console.log('error in GET', error)
        })
}

function refreshTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (let task of todos) {
        taskList.innerHTML += `
        <tr id="row" data-testid="toDoItem">
        <td>${task.text}</td>
        <td><button onclick="updateTask(${task.id}, event)" data-testid="completeButton">Complete?</button></td>
        <td><button onclick="deleteTask(${task.id})" data-testid="deleteButton">Delete</button></td>
        </tr>
        `;
    }
}

function deleteTask(todosId) {
    axios.delete(`/todos/${todosId}`).then((response) => {
        // refreshTasks();
        getTasks();
    }).catch((error) => {
        console.log('error deleting task', error);
        alert('error');
    });
}

function updateTask(todosId, event) {

    event.target.parentElement.parentElement.classList.add("completed");
    axios.put(`/todos/${todosId}`).then((response) => {

        // getTasks();
        // refreshTasks();
    }).catch((error) => {
        console.log('error', error);
        alert('not good');
    });
}
