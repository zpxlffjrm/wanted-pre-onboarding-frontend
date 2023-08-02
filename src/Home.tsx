import React, { useEffect, useState } from "react"
import logo from "@/assets/icons/logo.svg"
import "@/styles/App.scss"
import { useLoginToken } from "./features/Auth/hooks/useLoginToken"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"
import { useAuth } from "./features/Auth/hooks/useAuth"

function Home() {
  const navigate = useNavigate()
  const { token } = useLoginToken()
  const { logout } = useAuth()

  const [isLogin, setIsLogin] = useState(!!token)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Box className="landing-btn-container">
          <Button variant="contained" color="primary" onClick={() => navigate("/todo")}>
            투두리스트
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={
              !isLogin
                ? () => navigate("/signin")
                : () => {
                    logout()
                    setIsLogin(false)
                  }
            }>
            {!isLogin ? "로그인" : "로그아웃"}
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/signup")}>
            회원가입
          </Button>
        </Box>
      </header>
    </div>
  )
}

export default Home
