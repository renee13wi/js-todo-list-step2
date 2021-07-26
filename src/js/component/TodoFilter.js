import { $ } from '../util/querySelector.js'

export default function TodoFilter({
  selectedUser
}) {
  this.todos = selectedUser.todoList
  this.$all = $('.all')
  this.$active = $('.active')
  this.$completed = $('.completed')
  
  this.handleBindEvents = () => {
    this.$all.addEventListener('click', () => {

    })
  }

  this.render = () => {

  }

  this.setState = () => {

  }
}