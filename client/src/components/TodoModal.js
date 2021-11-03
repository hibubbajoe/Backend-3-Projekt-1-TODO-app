
import React, { useState } from 'react'
import {
    Button,
    Box,
    Typography,
    TextField,
    Modal,
    MenuItem
} from '@mui/material';

export default function TodoModal({ isOpened, data }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
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
    )
}

