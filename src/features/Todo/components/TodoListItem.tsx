import { FormControlLabel, Checkbox, Button, TextField } from "@mui/material"
import { Todo } from "../type"
import { useState } from "react"

interface TodoListItemProps {
  todo: Todo
  onUpdate: (id: number, todo: Todo) => void
  onRemove: (id: number) => void
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(todo.todo)

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleUpdate = () => {
    onUpdate(todo.id, {
      ...todo,
      todo: content,
    })
    toggleEditing()
  }

  const revertContent = () => {
    setContent(todo.todo)
    toggleEditing()
  }

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => {
              onUpdate(todo.id, {
                ...todo,
                isCompleted: !todo.isCompleted,
              })
            }}
          />
        }
        label={
          isEditing ? (
            <TextField
              inputProps={{
                "data-testid": "modify-input",
              }}
              defaultValue={todo.todo}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          ) : (
            todo.todo
          )
        }
      />
      <Button
        variant="outlined"
        data-testid={isEditing ? "submit-button" : "modify-button"}
        disabled={!content}
        onClick={isEditing ? handleUpdate : toggleEditing}>
        {isEditing ? "제출" : "수정"}
      </Button>
      <Button
        data-testid={isEditing ? "cancel-button" : "delete-button"}
        variant="outlined"
        onClick={isEditing ? revertContent : () => onRemove(todo.id)}>
        {isEditing ? "취소" : "삭제"}
      </Button>
    </>
  )
}
