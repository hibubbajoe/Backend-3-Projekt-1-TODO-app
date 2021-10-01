import React, { useEffect, useState } from "react";
import todoFetches from "../fetches/TodoFetches";

export default function TodoItem(props) {
  const payload = props.match.params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    todoFetches.getSingleTodo(payload)
      .then(res => setData(res.data));
  }, [])

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}
