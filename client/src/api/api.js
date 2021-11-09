import axios from 'axios';
import { getToken } from '../utils/tokenHandlers';

const url = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { token: getToken() },
});

// TODO endpoints
export const insertTodo = (payload) => url.post('/todos', payload);
export const getUserTodos = () => url.get('/todos');
export const getSingleTodo = (id) => url.get(`/todos/${id}`);
export const deleteTodoById = (id) => url.delete(`/todos/${id}`);
export const editTodoById = (payload, id) => url.post(`/todos/${id}`, payload);

// USER endpoints
export const loginUser = (payload) => url.post('/users/login', payload);
export const addNewUser = (payload) => url.post('/users', payload);

// CATEGORY endpoints
export const getUserCategories = () => url.get('/categories');
export const addNewUserCategory = (payload) => url.post('/categories', payload);
export const deleteUserCategory = (id) => url.delete(`/categories/${id}`);

const api = {
  insertTodo,
  getUserTodos,
  getSingleTodo,
  deleteTodoById,
  editTodoById,
  addNewUser,
  loginUser,
  getUserCategories,
  addNewUserCategory,
  deleteUserCategory,
};

export default api;
