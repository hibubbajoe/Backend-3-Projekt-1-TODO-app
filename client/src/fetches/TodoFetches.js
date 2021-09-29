import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const insertTodo = payload => url.post(`/todo`, payload);

const todoFetches = {
  insertTodo
};

export default todoFetches;
