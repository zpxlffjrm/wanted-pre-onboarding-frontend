import { useLoginToken } from "@/features/Auth/hooks/useLoginToken"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Todo } from "../type"
import { useTodo } from "../hooks"
import { Button, Checkbox, Container, FormControlLabel, TextField } from "@mui/material"
import { AxiosError } from "axios"
import { TodoListItem } from "../components"

export const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const navigate = useNavigate()
  const { token } = useLoginToken()
  const { get, create, update, remove } = useTodo()

  const handleCreate = async () => {
    const response = await create({ todo: newTodo })

    if (response && !Array.isArray(response)) {
      setTodos([...todos, response as Todo])
      setNewTodo("")
    }
  }

  const handleRemove = async (id: number) => {
    const response = await remove(id)

    if (!response) {
      const position = todos.findIndex((todo) => todo.id === id)

      if (position !== -1) {
        setTodos([...todos.slice(0, position), ...todos.slice(position + 1)])
      }
    }
  }

  const updateTodo = (id: number, todo: Todo) => {
    const position = todos.findIndex((todo) => todo.id === id)

    if (position !== -1) {
      setTodos([...todos.slice(0, position), todo, ...todos.slice(position + 1)])
    }
  }

  const handleUpdate = async (id: number, todo: Todo) => {
    const response = await update(id, todo)

    if (!(response instanceof AxiosError)) {
      updateTodo(id, todo)
    }
  }

  useEffect(() => {
    get().then((response) => {
      if (Array.isArray(response)) {
        setTodos(response)
      }
    })
  }, [])

  useEffect(() => {
    if (!token) {
      navigate("/signin", { replace: true })
    }
  }, [token])

  return (
    <Container className="TodoPageJSX">
      <h1>Todo</h1>
      <div className="input-todo">
        <TextField
          label="할 일"
          variant="outlined"
          margin="normal"
          required
          type="text"
          inputProps={{
            "data-testid": "new-todo-input",
          }}
          onChange={(e) => {
            setNewTodo(e.target.value)
          }}
        />
        <Button
          variant="outlined"
          disabled={!newTodo}
          onClick={handleCreate}
          data-testid="new-todo-add-button">
          추가
        </Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoListItem todo={todo} onUpdate={handleUpdate} onRemove={handleRemove} />
          </li>
        ))}
      </ul>
    </Container>
  )
}
