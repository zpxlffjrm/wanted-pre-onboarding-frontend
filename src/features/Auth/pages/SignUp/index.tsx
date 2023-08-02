import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material"
import { useState, useMemo, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useLoginToken } from "../../hooks/useLoginToken"

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [termAgreed, setTermAgreed] = useState(false)

  const navigate = useNavigate()

  const { signUp } = useAuth()
  const { token } = useLoginToken()

  const isEmailValid = useMemo(() => {
    return email.includes("@")
  }, [email])

  const isPasswordValid = useMemo(() => {
    return password.length >= 8
  }, [password])

  const handleSignUp = async () => {
    const error = await signUp({ email, password })

    if (error) {
      alert(error.response?.data.message)
      return
    }

    navigate("/signin")
  }

  useEffect(() => {
    if (token) {
      navigate("/todo", { replace: true })
    }
  }, [token])

  return (
    <Container className="SignUpJSX">
      <Card>
        <CardHeader title="회원가입"></CardHeader>
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

          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                onChange={(e) => {
                  setTermAgreed(e.target.checked)
                }}
              />
            }
            label="이용약관에 동의합니다"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            data-testid="signup-button"
            disableRipple={!isEmailValid || !isPasswordValid || !termAgreed}
            disabled={!isEmailValid || !isPasswordValid || !termAgreed}
            onClick={handleSignUp}>
            회원가입
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
