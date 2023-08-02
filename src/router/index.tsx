import React from "react"

import { SignIn } from "@/features/Auth/pages"
import { Route } from "react-router-dom"
import Home from "@/Home"
import { SignUp } from "@/features/Auth/pages/SignUp"
import { TodoPage } from "@/features/Todo/pages"

function RootRouter() {
  return (
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="todo" element={<TodoPage />} />
    </Route>
  )
}
export default RootRouter
