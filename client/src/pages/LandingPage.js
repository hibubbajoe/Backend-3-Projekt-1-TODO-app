import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import SideBar from '../components/SideBar';
import EditModal from '../components/EditModal';
import TodoContainer from '../components/TodoContainer';
import TodoInputField from '../components/TodoInputField';
import { FetchContext } from '../context/FetchContext';
import { deleteToken } from '../utils/tokenHandlers';
// import { loggedInUser } from '../api/api';
import { LoggedInContext } from '../context/LoggedInContext';

export default function LandingPage() {
  const { filteredTodos } = useContext(FetchContext);
  const { userLoggedIn, getIsUserLoggedIn } = useContext(LoggedInContext);

  // const [loggedIn, setLoggedIn] = useState();
  const history = useHistory();

  useEffect(() => {
    getIsUserLoggedIn();
    console.log(userLoggedIn);
  });

  // const handleLogin = async () => {
  //   await loggedInUser().then((res) => setLoggedIn(res.data));
  // };

  // useEffect(() => {
  //   handleLogin();
  // }, []);

  // useEffect(() => {
  //   console.log(loggedIn);
  // }, [loggedIn]);

  const logOutHandler = () => {
    deleteToken();
    history.push('/login');
  };

  return (
    <>
      {userLoggedIn ? (
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
      ) : (
        <h2>
          Please
          <a href="/login"> log in </a>
          to view your todos. If you are already logged in, try refreshing the
          page.
        </h2>
      )}
    </>
  );
}
