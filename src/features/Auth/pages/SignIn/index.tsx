import { Box, Button, Card, CardContent, CardHeader, Container, TextField } from "@mui/material"
import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useLoginToken } from "../../hooks/useLoginToken"

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { login } = useAuth()
  const { token } = useLoginToken()

  const handleSignIn = async () => {
    const error = await login({ email, password })

    if (error) {
      alert(error.response?.data.message)
      return
    }

    navigate("/todo", { replace: true })
  }

  const isEmailValid = useMemo(() => {
    return email.includes("@")
  }, [email])

  const isPasswordValid = useMemo(() => {
    return password.length >= 8
  }, [password])

  useEffect(() => {
    if (token) {
      navigate("/todo", { replace: true })
    }
  }, [token])

  return (
    <Container className="SignInJSX">
      <Card>
        <CardHeader title="로그인"></CardHeader>
        <CardContent>
          <Box>
            <TextField
              inputProps={{
                "data-testid": "email-input",
              }}
              label="아이디"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              autoFocus
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />

            <TextField
              inputProps={{
                "data-testid": "password-input",
              }}
              label="비밀번호"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            data-testid="signin-button"
            disableRipple={!isEmailValid || !isPasswordValid}
            disabled={!isEmailValid || !isPasswordValid}
            onClick={handleSignIn}>
            로그인
          </Button>
          <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/signup")}>
            회원가입
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
