import React, { useContext, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import SideBar from '../components/SideBar';
import EditModal from '../components/EditModal';
import TodoContainer from '../components/TodoContainer';
import TodoInputField from '../components/TodoInputField';
import { FetchContext } from '../context/FetchContext';

export default function LandingPage() {
  const { filteredTodos, setTrigger, trigger } = useContext(FetchContext);

  useEffect(() => {
    setTrigger(!trigger);
  }, []);

  return (
    <>
      <Box sx={{ flexgrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
