import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import todoFetches from "../fetches/TodoFetches";
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
    MenuItem
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
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const onSubmit = async e => {
        e.preventDefault();
        const payload = { title, body };

        await todoFetches
            .insertTodo(payload)
            .then(res => {
                setTitle("");
                setBody("");
            })
            .then(fetchData());
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items)
    }

    function fetchData() {
        todoFetches.getAllTodos().then(res => setData(res.data));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onChange = e => {
        if (e.target.name === "body") {
            setBody(e.target.value);
        } else if (e.target.name === "title") {
            setTitle(e.target.value);
        }
    };

    return (
        <>
            <main>
                {/* Hero unit */}
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
                            <Button variant="outlined" onClick={handleOpen}>Add me</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId={'data'}>
                            {(provided) => (
                                <Grid sx={{ width: '100%' }} {...provided.droppableProps} ref={provided.innerRef}>
                                    {data && data.map((card, index) => {
                                        return (
                                            <Draggable key={card._id} draggableId={card._id} index={index}>
                                                {(provided) => (
                                                    <Card sx={{ m: 0.5 }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                                                        <CardActions>
                                                            <Button size="small">Edit</Button>
                                                            <Button size="small">View</Button>
                                                        </CardActions>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </Grid>

                            )}
                        </Droppable>
                    </DragDropContext >
                </Container>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom>What do you want todo</Typography>
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" label="Title" />
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" label="Description" />
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" label="Type of todo" select >
                            {data.map((option) => {
                                return <MenuItem key={option.category} value={option.category}>{option.category}</MenuItem>
                            })}
                        </ TextField >
                        <Button variant="outlined" sx={{ width: '50%', m: 0.5 }} onClick={onSubmit}>Add</Button>
                    </Box>
                </Modal>
            </main>
        </>
    );
}