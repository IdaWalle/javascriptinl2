const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const error = document.querySelector ('#error');

let todos = [];

// funkar ej // 
const validateText = () => {

    if(input.value.trim() === '') {
      error.innerText = 'Skriv ut text..';
      input.classList.add('is-invalid');
      return false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
  }

    // funkar ej // 

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => res.json())
    .then(data => {
      todos = data;
     
      listTodos();
    })
}
fetchTodos();



const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {

    newTodo(todo);
  })
}

const newTodo = (todo) => {

  let card = document.createElement('div');
  card.classList.add('card', 'p-3', 'my-2');

  let innerCard = document.createElement('div');
  innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  let title = document.createElement('h3');
  title.innerText = todo.title;

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.innerText = 'X';
  button.addEventListener('click', () => {
    console.log(todo.id)
  })

  innerCard.appendChild(title);
  innerCard.appendChild(button);
  card.appendChild(innerCard);
  output.appendChild(card);

}



const createTodo = (title) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)

    let newTodo = {
      ...data,
      id: Date.now().toString()
    }
    console.log(newTodo);
    todos.unshift(newTodo);
    listTodos();
  })
}


form.addEventListener('submit', e => {
  e.preventDefault();

  validateText(input);
  if (validateText(input)) {
    createTodo(input.value);
  }

  form.reset();
})