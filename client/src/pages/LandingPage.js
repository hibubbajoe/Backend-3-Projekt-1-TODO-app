import React, { useState, useEffect } from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CreateOutlinedIcon from '@mui/icons-material/Create';
import LabelOutlinedIcon from '@mui/icons-material/Label';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import api from "../api/api";
import { ModalBox } from './Styles/AddModal';
import { styled } from '@mui/styles';
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
    Select,
    Collapse,
    InputBase
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
    const [categories, setCategories] = useState([]);

    // NEW ITEM
    const [todoValue, setTodoValue] = useState({});
    const [category, setCategory] = useState({});
    const [todos, setTodos] = useState([]);
    const [activeBtn, setActiveBtn] = useState();

    const [collapse, setCollapse] = useState(false)
    const [categoryCollapse, setCategoryCollapse] = useState(false)
    const [open, setOpen] = useState(false);


    const handleOpen = (card) => {
        setTodoValue(card);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const insertSubmit = async (e) => {
        e.preventDefault();
        await api.insertTodo(todoValue);
        setTodoValue({})
        fetchData()
        setCollapse(false);
    };

    const updateSubmit = async (e) => {
        e.preventDefault();
        await api.editTodoById(todoValue, todoValue._id);
        // setTodoValue({})
        // fetchData()
        // setCollapse(false);
    };

    const deleteSubmit = async (e) => {
        e.preventDefault();
        await api.deleteTodoById(todoValue._id);
        // setTodoValue({})
        // fetchData()
        // setCollapse(false);
    };

    const insertCategory = async (e) => {
        e.preventDefault();
        console.log(category);
        await api.addNewUserCategory({ "category": category });
        setTodoValue({})
        fetchData()
        setCategoryCollapse(false);
    };

    function fetchData() {
        api.getUserTodos().then(res => setData(res.data));
        setTodos(data);
        api.getUserCategories().then(res => setCategories(res.data));
    };

    const filterCategories = (e, category) => {

        setActiveBtn(e.target.id);
        if (category.length > 0) setTodos(category)
        else {
            const filteredTodos = data.filter(todo => todo.category === category._id)
            setTodos(filteredTodos);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    console.log(activeBtn)

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
            <Box sx={{ flexgrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item
                        xs={12}

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

                            <Card
                                sx={{ width: '100%', borderRadius: '10px', shadow: 1, border: 1, p: 1, pt: 2 }}
                            >
                                <Box component="form">
                                    <Collapse in={collapse}>
                                        <InputBase sx={{ width: '80%', m: 0.5 }} variant="outlined" name="title" placeholder="Title" autoComplete='off' onChange={handleOnChange} />
                                    </Collapse>
                                    <InputBase sx={{ width: '80%', m: 0.5, }} name="body" variant="standard " placeholder="Add a new todo..." autoComplete='off' required
                                        onChange={handleOnChange} onClick={() => setCollapse(true)}
                                    />
                                    <Collapse in={collapse}>
                                        <Select sx={{ width: '80%', m: 0.5 }} variant="outlined" value={category} label="Type of todo" onChange={handleCategories}>
                                            {categories.map((option, i) => {
                                                return <MenuItem key={i} value={option.category}>{option.category}</MenuItem>
                                            })}
                                        </ Select >
                                        <Button onClick={() => setCollapse(false)}>Close</Button>
                                        <Button onClick={insertSubmit}>Add note</Button>
                                    </Collapse>
                                </Box>
                            </Card>
                        </Container>

                        <Container sx={{ py: 8 }} maxWidth="md">
                            <Grid sx={{ width: '100%' }}>
                                {todos && todos.map((card) => {
                                    return (
                                        <Card key={card._id} sx={{ m: 0.5 }}>
                                            <CardActionArea onClick={() => handleOpen(card)}>
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="h5" component="div">
                                                            {card.title}
                                                        </Typography>
                                                        <Typography variant="body2" component="div">
                                                            {moment(card.updatedAt).format('lll')}
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
                    </Grid>

                    {/* SIDEBAR WITH FILTER FUNCTIONALITY*/}
                    <Box xs={2} sx={{ position: 'absolute', top: '10%', display: 'flex', flexDirection: 'column', width: '15rem' }}>
                        <Button id={'todos'} sx={{ color: 'black', justifyContent: 'flex-start', pl: 3, backgroundColor: activeBtn === 'todos' ? '#FDFD66' : '' }}
                            onClick={(e) => filterCategories(e, data)}>
                            <LightbulbOutlinedIcon />
                            Todos
                        </Button>
                        {categories.map((category, index) => {
                            return (
                                <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: activeBtn === category.category ? '#FDFD66' : '' }}>
                                    <Button id={category.category}
                                        sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }}
                                        onClick={(e) => filterCategories(e, category)}>
                                        <LabelOutlinedIcon />{category.category}
                                    </Button>
                                    <Button onClick={() => api.deleteUserCategory(category._id)}>
                                        <DeleteForeverOutlinedIcon sx={{ alignSelf: "center" }} />
                                    </Button>
                                </Box>
                            )
                        })}
                        <Button sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }} onClick={() => setCategoryCollapse(!categoryCollapse)}><AddOutlinedIcon />Add category</Button>
                        <Collapse in={categoryCollapse}>
                            <InputBase sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }} variant="outlined" name="category" placeholder="category" autoComplete='off' onChange={handleCategories} />
                            <Button sx={{ color: 'black', justifyContent: 'flex-start', pl: 3 }} onClick={insertCategory}>Add category</Button>

                        </Collapse>
                    </Box>
                </Grid>

                {/* MODAL WITH EDIT FUNCTIONALITY */}
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
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" name="title" value={todoValue.title} label="Title" onChange={handleOnChange} />
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" name="body" value={todoValue.body} label="Description" onChange={handleOnChange} required />
                        <Select sx={{ width: '100%', m: 0.5 }} variant="outlined" value={category} label="Type of todo" onChange={handleCategories}>
                            {categories.map((option, i) => {
                                return <MenuItem key={option._id} value={option.category}>{option.category}</MenuItem>
                            })}
                        </ Select >
                        <Button variant="outlined" sx={{ width: '50%', m: 0.5 }} onClick={updateSubmit}>Update todo</Button>
                        <Button variant="outlined" sx={{ width: '50%', m: 0.5, color: "red" }} onClick={deleteSubmit}>Delete todo</Button>
                    </ModalBox>
                </Modal>
            </Box >
        </>
    );
}