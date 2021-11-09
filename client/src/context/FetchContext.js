import React, { useState, useEffect, createContext } from 'react';
import { getUserTodos, getUserCategories } from '../api/api';

export const FetchContext = createContext();

export const FetchProvider = (props) => {
  const [todoData, setTodoData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState();
  const [card, setCard] = useState();
  const [open, setOpen] = useState();
  const [trigger, setTrigger] = useState(false);

  const handleOpen = (cardData) => {
    setCard(cardData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserTodos()
      .then((res) => {
        setTodoData(res.data);
        setFilteredTodos(res.data);
      });

    getUserCategories()
      .then((res) => setCategoryData(res.data));
  }, [trigger]);

  return (
    <FetchContext.Provider value={{
      todoData, categoryData, setFilteredTodos, filteredTodos, handleOpen, handleClose, open, card, setTrigger, trigger,
    }}
    >
      {props.children}
    </FetchContext.Provider>
  );
};
