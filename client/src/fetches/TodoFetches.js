import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const insertTodo = payload => url.post(`/todos`, payload);
export const getAllTodos = () => url.get("/todos");
export const getSingleTodo = payload => url.get("/todos/:id", payload);

const todoFetches = {
  insertTodo,
  getAllTodos,
  getSingleTodo
};

export default todoFetches;
