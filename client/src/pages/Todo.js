// import { response } from 'express';
import React, { useEffect, useState } from "react";
// import axios from "axios";
import todoFetches from "../fetches/TodoFetches";

export default function Todo() {
  // FETCH ITEMS
  const [data, setData] = useState([]);

  // NEW ITEM
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    const payload = { title, body };

    await todoFetches
      .insertTodo(payload)
      .then(res => {
        setTitle("");
        setBody("");
      })
      .then(fetchData());
  };

  function fetchData() {
    todoFetches.getAllTodos().then(res => setData(res.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = e => {
    if (e.target.name === "body") {
      setBody(e.target.value);
    } else if (e.target.name === "title") {
      setTitle(e.target.value);
    }
  };

  return (
    <div className="container">
      <h1 className="App">Keep track of what you have to do!</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Todo</label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Description</label>
          <input
            type="textarea"
            className="form-control"
            name="body"
            id="body"
            onChange={onChange}
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Add new todo" />
      </form>

      {/* <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="New Todo"
          onChange={onChange}
        />
        <input type="textarea" name="body" id="body" onChange={onChange} />
        <input className="btn btn-primary" type="submit" value="Add new todo" />
      </form> */}
      <h2 className="text-center">The stuff you currently have to do is...</h2>
      <ul className="list-group">
        {data.map((item, i) => (
          <li className="list-group-item" key={i}>
            <a href={`/todos/${item._id}`}>{item.title}</a>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
