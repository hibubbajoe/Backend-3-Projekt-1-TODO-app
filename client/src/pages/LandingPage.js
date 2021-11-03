import React, { useState, useEffect } from 'react';
import api from "../api/api";
import { ModalBox } from './Styles/AddModal';
import moment from 'moment';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Box,
    Typography,
    Container,
    TextField,
    Modal,
    Grid,
    MenuItem,
    CardActionArea,
    Select
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '10px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function LandingPage() {
    // FETCH ITEMS
    const [data, setData] = useState([]);

    // NEW ITEM
    const [todoValue, setTodoValue] = useState({});
    const [category, setCategory] = useState({});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const categories = [
        ...new Set(data.map((item) => item.category)),
    ]

    const onSubmit = async e => {
        e.preventDefault();
        await api.insertTodo(todoValue)
        setTodoValue({})
        fetchData()
        handleClose()
    };

    function fetchData() {
        api.getUserTodos().then(res => setData(res.data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCategories = (e) => {
        setCategory(e.target.value)
        setTodoValue({
            ...todoValue,
            'category': e.target.value
        })
    }

    const handleOnChange = (e) => {
        e.preventDefault();

        setTodoValue({
            ...todoValue,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.pper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm" >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Todos
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Please add more todos
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="outlined" onClick={handleOpen}>Add todo</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid sx={{ width: '100%' }}>
                        {data && data.map((card) => {
                            return (
                                <Card key={card._id} sx={{ m: 0.5 }}>
                                    <CardActionArea href={`/todos/${card._id}`}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="h5" component="div">
                                                    {card.title}
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    {moment(card.published).format('LL')}
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ m: 1 }} variant="body2">
                                                {card.body}
                                            </Typography>
                                        </CardContent>

                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </Grid>
                </Container>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ModalBox component="form" sx={style}>
                        <Typography component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom>What do you want todo</Typography>
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" name="title" label="Title" onChange={handleOnChange} />
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" name="body" label="Description" onChange={handleOnChange} />
                        <Select sx={{ width: '100%', m: 0.5 }} variant="outlined" value={category} label="Type of todo" onChange={handleCategories}>
                            {categories.map((option, i) => {
                                return <MenuItem key={i} value={option}>{option}</MenuItem>
                            })}
                        </ Select >
                        <Button variant="outlined" sx={{ width: '50%', m: 0.5 }} onClick={onSubmit}>Add</Button>
                    </ModalBox>
                </Modal>
            </main>
        </>
    );
}