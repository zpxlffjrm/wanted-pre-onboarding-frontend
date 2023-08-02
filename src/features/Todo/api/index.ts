import { axiosClient } from "@/common/httpClient"
import { PostTodoRequestBody, Todo } from "../type"

export const todoApi = {
  getTodos: () => {
    return axiosClient.get<Todo[]>("/todos")
  },
  postTodo: (body: PostTodoRequestBody) => {
    return axiosClient.post<Todo>("/todos", body)
  },
  updateTodo: (id: number, body: Partial<Todo>) => {
    return axiosClient.put<Todo>(`/todos/${id}`, body)
  },
  deleteTodo: (id: number) => {
    return axiosClient.delete<void>(`/todos/${id}`)
  },
}
