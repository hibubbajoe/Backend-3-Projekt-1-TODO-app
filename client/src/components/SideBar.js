import React, { useState, useContext } from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LabelOutlinedIcon from '@mui/icons-material/Label';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
  Button,
  Box,
  Collapse,
  InputBase,
} from '@mui/material';
import { addNewUserCategory, deleteUserCategory } from '../api/api';
import { FetchContext } from '../context/FetchContext';

export default function SideBar() {
  const [insertValue, setInsertValue] = useState({});
  const {
    categoryData, todoData, setFilteredTodos, setTrigger, trigger,
  } = useContext(FetchContext);
  const [activeBtn, setActiveBtn] = useState();
  const [collapse, setCollapse] = useState(false);

  const insertCategory = async (e) => {
    e.preventDefault();
    const newCategory = { category: insertValue };
    try {
      await addNewUserCategory(newCategory);
      setInsertValue({});
      setCollapse(false);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (e, id) => {
    e.preventDefault();

    try {
      await deleteUserCategory(id);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCategories = (e, category) => {
    e.preventDefault();
    setActiveBtn(e.target.id);
    if (category.length > 0) setFilteredTodos(category);
    else {
      const filteredTodos = todoData.filter((todo) => todo.category === category._id);
      setFilteredTodos(filteredTodos);
    }
  };

  const handleCategories = (e) => {
    setInsertValue(e.target.value);
  };

  return (
    <>
      <Box
        xs={2}
        sx={{
          position: 'absolute', top: '10%', display: 'flex', flexDirection: 'column', width: '15rem',
        }}
      >
        <Button
          id="todos"
          sx={{
            color: 'black', justifyContent: 'flex-start', pl: 3, backgroundColor: activeBtn === 'todos' ? '#FDFD66' : '',
          }}
          onClick={(e) => filterCategories(e, todoData)}
        >
          <LightbulbOutlinedIcon />
          Todos
        </Button>
        {categoryData.map((category) => (
          <Box key={category._id} sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: activeBtn === category.category ? '#FDFD66' : '' }}>
            <Button
              id={category.category}
              sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }}
              onClick={(e) => filterCategories(e, category)}
            >
              <LabelOutlinedIcon />
              {category.category}
            </Button>
            <Button onClick={(e) => deleteCategory(e, category._id)}>
              <DeleteForeverOutlinedIcon sx={{ alignSelf: 'center' }} />
            </Button>
          </Box>
        ))}
        <Button sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }} onClick={() => setCollapse(!collapse)}>
          <AddOutlinedIcon />
          Add category
        </Button>
        <Collapse in={collapse}>
          <InputBase sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }} variant="outlined" name="category" placeholder="category" autoComplete="off" onChange={handleCategories} />
          <Button sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }} onClick={insertCategory}>Add category</Button>
        </Collapse>
      </Box>
    </>
  );
}
