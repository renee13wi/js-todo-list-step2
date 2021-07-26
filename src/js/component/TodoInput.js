import { $ }from '../util/querySelector.js'

export default function TodoInput({
onTodoAdd
}) {
  this.onTodoAdd = onTodoAdd

  this.newTodo = $('.new-todo')

  this.handleAddTodo = () => {
    this.newTodo.addEventListener("keyup", (e) => {
      if(e.keyCode === 13) {
        const todoItem = e.target.value
        this.onTodoAdd(todoItem)
        this.newTodo.value = ''
      }
    })
  }

  this.render = () => {
    this.handleAddTodo()
  }
  
  this.render()
}