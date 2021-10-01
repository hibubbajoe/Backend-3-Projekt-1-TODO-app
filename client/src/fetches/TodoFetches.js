import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const insertTodo = payload => url.post(`/todo`, payload);
export const getTodos = () => url.get('/todos');

const todoFetches = {
  insertTodo,
  getTodos
};

export default todoFetches;
