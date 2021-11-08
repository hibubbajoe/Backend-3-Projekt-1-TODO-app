import React, { useState, useContext, useEffect } from 'react';
import api from "../api/api";
import {FetchContext} from '../context/FetchContext'

import {
    Box,
    Button,
    Modal,
    TextField,
    Select,
    Typography,
    MenuItem,
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

export default function EditModal() {
    const {categoryData, open, handleClose, card, trigger, setTrigger} = useContext(FetchContext);
    const [insertValue, setInsertValue] = useState();
    const [categoryOption, setCategoryOption] = useState();

    const handleCategories = (e, child) => {
        e.preventDefault();
        setCategoryOption(e.target.value);
        setInsertValue({
            ...insertValue,
            [e.target.name]: child.props.id            
        });
    }

    const closeModal = () => {
        setCategoryOption("");
        handleClose();
    }

    useEffect(() => {
        setInsertValue(card);
    }, [open]);

    const handleOnChange = (e) => {
        e.preventDefault();

        setInsertValue({
            ...insertValue,
            [e.target.name]: e.target.value
        })
    }

    const updateSubmit = async (e) => {
        e.preventDefault();
        await api.editTodoById(insertValue, insertValue._id);
        setInsertValue({});
        setCategoryOption("");
        handleClose()
        setTrigger(!trigger)
    };

    const deleteSubmit = async (e) => {
        e.preventDefault();
        await api.deleteTodoById(insertValue._id);
        setInsertValue({});
        setCategoryOption("");
        handleClose()     
        setTrigger(!trigger)
    };
    

return (
    <>
    {insertValue && < Modal
                    open={open}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box component="form" sx={style}>
                        <Typography component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom>What do you want todo</Typography>
                        <TextField sx={{ width: '100%', m: 0.5 }} variant="outlined" name="title" value={insertValue.title || ''} label="Title" onChange={handleOnChange} />
                        <TextField sx={{ width: '100%', m: 0.5 }} multiline variant="outlined" name="body" value={insertValue.body || ''} label="Description" onChange={handleOnChange} required />
                        <Select sx={{ width: '100%', m: 0.5, }} variant="outlined" name='category' value={categoryOption || ''} label="Type of todo" onChange={(e, child) => handleCategories(e, child)}>
                            {categoryData.map((option, i) => {
                                return <MenuItem key={option._id} id={option._id} value={option.category}>{option.category}</MenuItem>
                            })}
                        </ Select >
                        <Button variant="outlined" sx={{ width: '50%', m: 0.5 }} onClick={updateSubmit}>Update todo</Button>
                        <Button variant="outlined" sx={{ width: '50%', m: 0.5, color: "red" }} onClick={deleteSubmit}>Delete todo</Button>
                    </Box>
                </Modal>}
    </>
)};