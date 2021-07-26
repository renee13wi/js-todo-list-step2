import {
  $, 
  $$
} from '../util/querySelector.js'

export default function TodoUser({
  userData,
  selectedUser,
  onUserAdd,
  onUserDelete,
  onUserSelect
}) {
  this.userData = userData
  this.selectedUser = selectedUser
  this.onUserAdd = onUserAdd
  this.onUserDelete = onUserDelete
  this.onUserSelect = onUserSelect

  this.$boxUserList = $('#user-list')

  const template = {
    eventButton: `
    <button class="ripple user-create-button" data-action="createUser">+ 유저 생성</button>
    <button class="ripple user-delete-button" data-action="deleteUser">삭제 -</button>`,
  };

  this.mapButtons = () => {
    let userButton= '';
    userButton = this.userData.map((user, index) => {
      return `<button class="ripple ${index === 0 ? "active": ""}" data-id=${user._id}>${user.name}</button>`
    }).join('') 
    this.$boxUserList.innerHTML = userButton + template.eventButton;
  }

  this.onUserSelectHandler = (e) => {
    const target = e.target
    const selectedUserId = target.dataset.id
    const $$ripple = $$(".ripple")

    if(target.classList.contains("ripple")) {
      $$ripple.forEach(element => element.classList.remove('active'));
      target.classList.add('active')
      this.onUserSelect(selectedUserId)
    }
  }

  this.events = () => {
    this.$boxUserList.addEventListener("click", e => this.onUserSelectHandler(e))

    this.createButton = $('.user-create-button')
    this.createButton.addEventListener("click", () => this.onUserAdd())

    this.deleteButton = $('.user-delete-button')
    this.deleteButton.addEventListener("click", () => this.onUserDelete())
  }

  this.render = () => {
    this.mapButtons()
    this.events()
  }

  this.setState = (nextState) => {
    this.userData = nextState
    this.render()
  }

  this.render()
}