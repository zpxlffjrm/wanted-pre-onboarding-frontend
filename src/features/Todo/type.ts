export interface PostTodoRequestBody {
  todo: string
}

export interface Todo {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}
