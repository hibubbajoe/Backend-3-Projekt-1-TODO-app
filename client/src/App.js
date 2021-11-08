import "./App.css";
import React from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FetchProvider } from "./context/FetchContext";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <div >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <FetchProvider>
            <Route path="/" component={LandingPage} />
          </FetchProvider>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
