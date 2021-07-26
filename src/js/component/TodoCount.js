import { $ } from '../util/querySelector.js'

export default function TodoCount({
  selectedUser
}) {
  this.todos = selectedUser.todoList
  this.todoCountGroup = $('.todo-count') 
  this.todoCount = this.todoCountGroup.querySelector("strong") 

  this.handleCountTodo = () => {
    this.todoCount.textContent = this.todos.length
  }

  this.render = () => {
    this.handleCountTodo()
  }

  this.setState = (nextState) => {
    this.todos = nextState.todoList
    this.render()
  }

  this.render()
}