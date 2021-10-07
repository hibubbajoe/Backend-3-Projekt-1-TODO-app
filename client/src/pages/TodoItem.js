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

  const onSubmit = async e => {
    e.preventDefault();
    const payload = { title, body };

    await todoFetches
      .editTodoById(payload, id)
      .then(() => history.push("/todos"));
  };

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
    <div className="d-flex justify-content-center flex-column">
      <h2>Need to edit or delete your stuff?</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Todo</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={title}
            name="title"
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Description</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={body}
            name="body"
            id="body"
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Edit Todo" />
        {/* 
        <button className="btn btn-primary" onClick={onSubmit}>
          Edit Todo
        </button> */}
      </form>
      <button className="btn btn-danger" onClick={deleteTodo}>
        Delete Todo
      </button>
    </div>
  );
}
