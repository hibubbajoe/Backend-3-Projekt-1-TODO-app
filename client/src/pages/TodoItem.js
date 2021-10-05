import React, { useEffect, useState } from "react";
import todoFetches from "../fetches/TodoFetches";
import { useHistory } from "react-router-dom";

export default function TodoItem(props) {
  const id = props.match.params.id;
  console.log(id);
  const history = useHistory();

  const [data, setData] = useState({});

  useEffect(() => {
    todoFetches.getSingleTodo(id).then(res => setData(res.data));
  }, []);

  function deleteTodo() {
    todoFetches.deleteTodoById(id).then(() => history.push("/todos"));
    console.log(id);
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <button onClick={deleteTodo}>Delete Todo</button>
    </div>
  );
}
