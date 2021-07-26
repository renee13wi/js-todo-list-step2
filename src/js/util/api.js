const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com'

export const request = async(url, method, data) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    if(res.ok) {
      const result = await res.json()
      return result
    } else {
      throw new Error(`잘못 되었습니다. status code: ${res.status}`)
    }
  } catch(e) {
    throw new Error(`서버 통신 중 에러 발생 : ${BASE_URL}${url}`)
  }
}

export const API_URL = {
  USER_LIST: `/api/users`,
  USER: (USER_ID) => `/api/users/${USER_ID}`,
  USER_TODO: (USER_ID) => `/api/users/${USER_ID}/items/`,
  USER_TODO_ITEM: (USER_ID, USER_TODO_ITEM_ID) => `/api/users/${USER_ID}/items/${USER_TODO_ITEM_ID}`,
  USER_TODO_ITEM_PRIORITY: (USER_ID, USER_TODO_ITEM_ID) => `/api/users/${USER_ID}/items/${USER_TODO_ITEM_ID}/priority`,
  USER_TODO_ITEM_TOGGLE: (USER_ID, USER_TODO_ITEM_ID) => `/api/users/${USER_ID}/items/${USER_TODO_ITEM_ID}/toggle`
}

export const METHOD = {
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
};

// User list 불러오기
export const getUserList = async() => await request(API_URL.USER_LIST)

// User 추가하기
export const postUser = async(userName) => {
  await request(API_URL.USER_LIST, METHOD.POST, {name: userName})
}

// User 불러오기
export const getUser = async(userId) => await request(API_URL.USER)

// User 삭제하기
export const removeUser = async(userId) => {
  await request(API_URL.USER(userId), METHOD.DELETE)
}

// User의 Todo Item 불러오기
export const getTodo = async(userId) => await request(API_URL.USER_TODO)

// User의 Todo Item 추가하기
export const postTodoItem = async(userId, todoItem) => {
  await request(API_URL.USER_TODO(userId), METHOD.POST, {contents: todoItem})
}

// User의 Todo Item 전부 삭제하기
export const removeTodoItemAll = async(userId) => {
  await request(API_URL.USER_TODO, {
    method: 'DELETE'
  })
}

// User의 Todo Item 1개 삭제하기
export const removeTodoItem = async(userId, userTodoItemId) => {
  await request(API_URL.USER_TODO_ITEM(userId, userTodoItemId), METHOD.DELETE)
}

// User의 Todo Item 내용 수정하기
export const putTodoItem = async(userId, userItemId) => {
  await request(API_URL.USER_TODO_ITEM, {
    method: 'PUT'
  })
}

// User의 Todo Item 우선순위 수정하기
export const putTodoItemPriority = async(userId, userItemId) => {
  await request(API_URL.USER_TODO_ITEM_PRIORITY, {
    method: 'PUT'
  })
}

// User의 Todo Item complete toggle
export const putTodoItemToggle = async(userId, userTodoItemId) => {
  await request(API_URL.USER_TODO_ITEM_TOGGLE(userId, userTodoItemId), METHOD.PUT)
}