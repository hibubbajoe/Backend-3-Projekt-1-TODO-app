const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const todosRoutes = require('./routes/todos');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');

const app = express();

// Connection to Mongo
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/todos', todosRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);

module.exports = app;
