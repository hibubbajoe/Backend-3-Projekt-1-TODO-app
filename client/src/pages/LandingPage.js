import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import SideBar from '../components/SideBar';
import EditModal from '../components/EditModal';
import TodoContainer from '../components/TodoContainer';
import TodoInputField from '../components/TodoInputField';
import { FetchContext } from '../context/FetchContext';
import { deleteToken } from '../utils/tokenHandlers';

export default function LandingPage() {
  const { filteredTodos, setTrigger, trigger } = useContext(FetchContext);
  const history = useHistory();

  useEffect(() => {
    setTrigger(!trigger);
  }, []);

  const logOutHandler = () => {
    deleteToken();
    history.push('/login');
  };

  return (
    <>
      <Box sx={{ flexgrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button onClick={logOutHandler}>Log Out</Button>
            <TodoInputField filteredTodos={filteredTodos} />
            <TodoContainer filteredTodos={filteredTodos} />
          </Grid>
          <SideBar />
        </Grid>
        <EditModal />
      </Box>
    </>
  );
}
