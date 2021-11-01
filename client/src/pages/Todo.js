// import { response } from 'express';
import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api/api";

export default function Todo() {
  // FETCH ITEMS
  const [data, setData] = useState([]);

  // NEW ITEM
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    const payload = { title, body };

    await api
      .insertTodo(payload)
      .then(res => {
        setTitle("");
        setBody("");
      })
      .then(fetchData());
  };

  function fetchData() {
    api.getAllTodos().then(res => setData(res.data));
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
    <div>
      <h1 className="App">JAG ÄR TODO</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="New Todo"
          onChange={onChange}
        />
        <input type="textarea" name="body" id="body" onChange={onChange} />
        <input type="submit" value="Add new todo" />
      </form>
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            <a href={`/todos/${item._id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
