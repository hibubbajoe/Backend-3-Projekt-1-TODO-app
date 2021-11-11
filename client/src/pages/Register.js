import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Button,
  TextField,
  Alert,
  Link,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { addNewUser } from '../api/api';
import { setToken } from '../utils/tokenHandlers';

export default function Register() {
  const [loginValue, setLoginValue] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();

    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addNewUser(loginValue)
      .then((res) => {
        console.log(res);
        setToken(res.data);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
      });
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
          Register your new account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          onChange={handleChange}
          noValidate
          sx={{ mt: 1 }}
        >
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
            I want to sign up
          </Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                Have and account already? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
