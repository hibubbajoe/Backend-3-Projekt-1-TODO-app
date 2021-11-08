import React, { useState, useEffect, createContext } from 'react';
import api from "../api/api";

export const FetchContext = createContext();

export const FetchProvider = props => {
    const [todoData, setTodoData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState();
    const [card, setCard] = useState();
    const [open, setOpen] = useState();
    const [trigger, setTrigger] = useState(false);
    
    const handleOpen = (card) => {        
        setCard(card);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        api.getUserTodos()
            .then(res => {
                setTodoData(res.data)
                setFilteredTodos(res.data)
            })

        api.getUserCategories()
            .then(res => setCategoryData(res.data))

    }, [trigger])

    return (
        < FetchContext.Provider value={{ todoData, categoryData, setFilteredTodos, filteredTodos, handleOpen, handleClose, open, card, setTrigger, trigger }}>
            {props.children}
        </FetchContext.Provider >
    )
};