import React, { useEffect, useState } from "react";
import todoFetches from "../fetches/TodoFetches";
import { useHistory } from "react-router-dom";

export default function TodoItem(props) {
  const id = props.match.params.id;

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


  const onChange = e => {
    if (e.target.name === "body") {
      setBody(e.target.value);
    } else if (e.target.name === "title") {
      setTitle(e.target.value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const payload = { title, body };

    todoFetches
      .editTodoById(payload, id)
      .then(() => history.push("/todos"))
  }

  useEffect(() => {
    todoFetches.getSingleTodo(id).then(res => {
      setTitle(res.data.title);
      setBody(res.data.body);
    });
  }, []);


  function deleteTodo() {
    todoFetches.deleteTodoById(id).then(() => history.push("/todos"));
    console.log(id);
  }

  return (
    <div>
      <form action="" method="post">
        <input type="text" onChange={onChange} value={title} name="title" id="title" />
        <input type="text" onChange={onChange} value={body} name="body" id="body" />
        <button onClick={onSubmit}>Edit Todo</button>
      </form>
      <button onClick={deleteTodo}>Delete Todo</button>
    </div>
  );
}
