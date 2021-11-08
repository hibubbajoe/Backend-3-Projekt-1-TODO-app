import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Container, Button, TextField, Link, Grid, Box, Typography } from '@mui/material';
import { loginUser } from '../api/api';
import { setToken } from "../utils/tokenHandlers"

export default function Login() {
  const history = useHistory();

  const [loginValue, setLoginValue] = useState({})

  const handleChange = (e) => {
    e.preventDefault();

    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(loginValue);
    setToken(user.data)
    history.push(`/`)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          Log in to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} onChange={handleChange} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Let me in
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}