import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import WelcomePage from './pages/WelcomePage';
import { FetchProvider } from './context/FetchContext';
import { LoggedInContext } from './context/LoggedInContext';
import { loggedInUser } from './api/api';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(undefined);

  async function getIsUserLoggedIn() {
    const loggedInUserRes = await loggedInUser();
    setUserLoggedIn(loggedInUserRes.data);
  }
  console.log(userLoggedIn);

  useEffect(() => {
    getIsUserLoggedIn();
  });

  return (
    <div>
      <LoggedInContext.Provider value={{ userLoggedIn, getIsUserLoggedIn }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <FetchProvider>
              {loggedInUser && (
                <Route exact path="/todos" component={LandingPage} />
              )}
            </FetchProvider>
            <Route exact path="/" component={WelcomePage} />
          </Switch>
        </ThemeProvider>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
