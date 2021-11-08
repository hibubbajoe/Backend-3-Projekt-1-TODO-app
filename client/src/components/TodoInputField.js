import React, {useContext, useState} from 'react';
import {FetchContext} from '../context/FetchContext';
import api from '../api/api';
import {
    Card,
    Container,
    Box,
    Collapse,
    Select,
    InputBase,
    Typography,
    Button,
    MenuItem
} from '@mui/material'

export default function TodoInputField(){

    const {categoryData, setTrigger, trigger} = useContext(FetchContext);
    
    const [categoryOption, setCategoryOption] = useState();
    const [insertValue, setInsertValue] = useState({});
    const [collapse, setCollapse] = useState(false);

    const insertSubmit = async (e) => {
        e.preventDefault();
        
        const newTodo = {
            title: insertValue.title,
            body: insertValue.body,
            category: insertValue.category,
        }
        
        try {     
            await api.insertTodo(newTodo);
            await setInsertValue({})
            setCollapse(false);
            setTrigger(!trigger)
        } catch (error) {
            console.log(error)
        }
    };

    const handleCategories = (e, child) => {
        setCategoryOption(e.target.value);
        setInsertValue({
            ...insertValue,
            [e.target.name]: child.props.id
            
        });
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setInsertValue({
            ...insertValue,
            [e.target.name]: e.target.value
        })
    }


    return (
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

            <Card sx={{ width: '100%', borderRadius: '10px', shadow: 1, border: 1, p: 1, pt: 2 }}>
                <Box component="form">
                    <Collapse in={collapse}>
                        <InputBase sx={{ width: '80%', m: 0.5 }} variant="outlined" name="title" placeholder="Title" autoComplete='off' onChange={handleOnChange} />
                    </Collapse>
                    <InputBase sx={{ width: '80%', m: 0.5 }} multiline variant="outlined" name="body" placeholder="Add new todo.." onChange={handleOnChange} onClick={() => setCollapse(true)} required />
                    <Collapse in={collapse}>
                        <Select sx={{ width: '80%', m: 0.5, }}  variant="outlined" name={'category'} value={categoryOption || ''} label="Type of todo" onChange={(e, child) => handleCategories(e, child)}>
                            
                            {categoryData.map((option, i) => {
                                return <MenuItem key={i} id={option._id} value={option.category}>{option.category}</MenuItem>
                            })}
                        </ Select >
                        <Button onClick={() => setCollapse(false)}>Close</Button>
                        <Button onClick={insertSubmit}>Add note</Button>
                    </Collapse>
                </Box>
            </Card>
        </Container>

    )
}