// import { response } from 'express';
import React, { useEffect, useState } from "react";
// import axios from "axios";
import todoFetches from "../fetches/TodoFetches";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    const payload = { title, body };

    await todoFetches.insertTodo(payload).then(res => {
      window.alert(`Todo inserted successfully`);
      setTitle("");
      setBody("");
    });
  };

  //   useEffect(() => {
  //     axios("http://localhost:5000/api/items").then(res => setData(res.data));
  //   }, []);

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
      {/* <ul>
        {data.map((item, i) => (
          <li key={i}>{item.title}</li>
        ))}
      </ul> */}
    </div>
  );
}
