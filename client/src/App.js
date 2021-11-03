import "./App.css";
import React from "react";
import Todo from "./pages/Todo";
import TodoItem from "./pages/TodoItem";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div class='body'>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Switch>
          <Route path="/todos/:id" component={TodoItem} />
          <Route path="/todos" component={Todo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
