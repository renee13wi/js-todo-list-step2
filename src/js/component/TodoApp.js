import {
  getUserList,
  postUser,
  getTodo,
  removeUser,
  removeTodoItemAll,
  removeTodoItem,
  postTodoItem,
  putTodoItem,
  putTodoItemPriority,
  putTodoItemToggle
} from '../util/api.js'

import {
  STATUS_ALL,
  STATUS_ACTIVE,
  STATUS_COMPLETED
} from '../util/constant.js'

import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import TodoUser from './TodoUser.js'
import TodoFilter from './TodoFilter.js'

export default function TodoApp() {

  this.todoAddHandler = async(todoItem) => {
    const userId = this.selectedUser._id
   
    await postTodoItem(userId, todoItem)
    const newUserData = await getUserList()
    this.state(newUserData)
    this.todoList.setState(this.selectedUser)
    this.todoCount.setState(this.selectedUser)
  }
  
  this.userAddHandler = async() => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if(!userName) return

    await postUser(userName)
    const newUserData = await getUserList()
    this.state(newUserData)
  }

  this.userDeleteHandler = async() => {
    const deleteId = this.selectedUser._id
    await removeUser(deleteId)
    const newUserData = await getUserList()
    this.state(newUserData)
  }

  this.userSelectHandler = (selectedUserId) => {
    this.selectedUser = this.userData.find(user => {
      return user._id == selectedUserId
    })
    this.todoList.setState(this.selectedUser)
    this.todoCount.setState(this.selectedUser)
  }

  this.todoToggleHandler = async(target) => {
    this.selectedUser.todoList = this.selectedUser.todoList.map(item => {
      if(item._id == target.id) {
        if(item.isCompleted == true) {
          item.isCompleted = false
          target.checked = false
        } else if (item.isCompleted == false) {
          item.isCompleted = true
          target.checked = true
        }
      }
      return item
    })
    this.todoList.setState(this.selectedUser)

    const userId = this.selectedUser._id
    const userTodoItemId = target.id
    await putTodoItemToggle(userId, userTodoItemId)
  }

  this.todoDeleteHandler = async(target) => {
    this.selectedUser.todoList = this.selectedUser.todoList.filter(item => {
      if(item._id !== target.id) {
        return item
      }
    })
    this.todoList.setState(this.selectedUser)
    this.todoCount.setState(this.selectedUser)

    const userId = this.selectedUser._id
    const userTodoItemId = target.id
    await removeTodoItem(userId, userTodoItemId)
  }

  this.render = async() => {
    this.userData = await getUserList()
    this.selectedUser = this.userData[0];
    
    this.todoInput = new TodoInput({
      onTodoAdd: this.todoAddHandler.bind(this)
    })
    this.todoList = new TodoList({
      selectedUser: this.selectedUser,
      onToggleTodo: this.todoToggleHandler.bind(this),
      onDeleteTodo: this.todoDeleteHandler.bind(this)
    })
    this.todoCount = new TodoCount({
      selectedUser: this.selectedUser,
    })
    this.todoUser = new TodoUser({
      userData: this.userData,
      selectedUser: this.selectedUser,
      onUserAdd: this.userAddHandler.bind(this),
      onUserDelete: this.userDeleteHandler.bind(this),
      onUserSelect: this.userSelectHandler.bind(this)
    })
    // this.todoFilter = new TodoFilter({
    //   selectedUser: this.selectedUser
    // })
  }

  this.state = (nextState) => {
    this.userData = nextState
    this.selectedUser = this.userData[0]
    this.todoUser.setState(nextState)
  }

  this.render()
}