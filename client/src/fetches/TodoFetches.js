import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const insertTodo = payload => url.post(`/todos`, payload);
export const getAllTodos = () => url.get("/todos");
export const getSingleTodo = id => url.get(`/todos/${id}`);
export const deleteTodoById = id => url.delete(`/todos/${id}`);
export const editTodoById = (payload, id) => url.post(`/todos/${id}`, payload);


const todoFetches = {
  insertTodo,
  getAllTodos,
  getSingleTodo,
  deleteTodoById,
  editTodoById
};

export default todoFetches;
