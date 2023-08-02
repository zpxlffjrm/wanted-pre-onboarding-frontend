import React from "react"
import ReactDOM from "react-dom/client"

import { RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import RootRouter from "./router"

const router = createBrowserRouter(createRoutesFromElements(RootRouter()))

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
