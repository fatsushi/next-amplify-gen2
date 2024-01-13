"use client"

import { useState, useEffect } from "react"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"

const client = generateClient<Schema>()

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([])

  async function listTodos() {
    const { data } = await client.models.Todo.list()
    setTodos(data)
  }

  useEffect(() => {
    listTodos()
  }, [])

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  )
}
