import { AxiosError } from "axios"
import { todoApi } from "../api"
import { PostTodoRequestBody, Todo } from "../type"
import { AxiosErrorData } from "@/common/httpClient/type"

export const useTodo = () => {
  async function get() {
    try {
      const response = await todoApi.getTodos()
      return response
    } catch (error) {
      return error as AxiosError<AxiosErrorData>
    }
  }
  async function create(body: PostTodoRequestBody) {
    try {
      const response = await todoApi.postTodo(body)
      return response
    } catch (error) {
      return error as AxiosError<AxiosErrorData>
    }
  }

  async function update(id: number, body: Partial<Todo>) {
    try {
      const response = await todoApi.updateTodo(id, body)
      return response
    } catch (error) {
      return error as AxiosError<AxiosErrorData>
    }
  }

  async function remove(id: number) {
    try {
      const response = await todoApi.deleteTodo(id)
      return response
    } catch (error) {
      return error as AxiosError<AxiosErrorData>
    }
  }

  return { create, update, remove, get }
}
