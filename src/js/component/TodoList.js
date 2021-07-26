import { $, $$ } from '../util/querySelector.js'
import { 
  STATUS_ALL,
  STATUS_ACTIVE,
  STATUS_COMPLETED
} from '../util/Constant.js'

function TodoList ({
  selectedUser,
  onToggleTodo,
  onDeleteTodo
}) {
  this.todoList = $('.todo-list')
  this.filters = $('.filters')

  this.onToggleTodo = onToggleTodo
  this.onDeleteTodo = onDeleteTodo
  this.todos = selectedUser.todoList

  this.todoTemplate = (item) => {
    return `<li id=${item._id} ${item.isCompleted == true ? "class=completed" : ""}>
              <div class="view">
                <input class="toggle" type="checkbox" id=${item._id} ${item.isCompleted === true ? "checked" : ""} />
                <label class="label">${item.contents}</label>
                <button class="destroy" id="${item._id}"></button>
              </div>
              <input class="edit" value="${item.contents}" />
            </li>`
  }
  
  this.handleMapAllTodo = () => {
    this.todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.handleMapActiveTodo = () => {
    const todos = this.todos.filter(item => item.isCompleted === false)
    todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.handleMapCompletedTodo = () => {
    const todos = this.todos.filter(item => item.isCompleted === true)
    todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.mapTodos = (option = STATUS_ALL) => {
    this.todoList.innerHTML = '';

    switch(option) {
      case STATUS_ALL :
        this.handleMapAllTodo()
        break;
      case STATUS_ACTIVE :
        this.handleMapActiveTodo()
        break;
      case STATUS_COMPLETED :
        this.handleMapCompletedTodo()
        break;
    }
  }

  this.handleBindEvents = () => {
    this.filters.addEventListener("click", e => {
      if(e.target.nodeName === 'A') {
        e.target.closest('ul')
                .querySelectorAll('a')
                .forEach((target) => target.classList.remove('selected'))
        e.target.classList.add('selected')
      }
      if(e.target.classList.contains("active")) {
        this.mapTodos(STATUS_ACTIVE)
      } else if(e.target.classList.contains("completed")) {
        this.mapTodos(STATUS_COMPLETED)
      } else if(e.target.classList.contains("all")) {
        this.mapTodos(STATUS_ALL)
      }
    })

    $$(".destroy").forEach(button => {
      button.addEventListener("click", e => {
        console.log(e)
        this.onDeleteTodo(e.target)
      })
    })

    $$(".toggle").forEach(chk => {
      chk.addEventListener("click", e => this.onToggleTodo(e.target))
    })
  }

  this.render = () => {
    this.mapTodos()
    this.handleBindEvents()
  }

  this.setState = (nextState) => {
    this.todos = nextState.todoList
    this.render()
  }

  this.render()
}

export default TodoList