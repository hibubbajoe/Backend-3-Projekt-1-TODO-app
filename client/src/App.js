import "./App.css";
import React from "react";
import Todo from "./pages/Todo";
import TodoItem from "./pages/TodoItem";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/todos/:id" component={TodoItem} />
        <Route path="/">
          <Todo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
