import React, { useContext } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Container,
  Grid,
  CardActionArea,
} from '@mui/material';
import { FetchContext } from '../context/FetchContext';

export default function TodoContainer({ filteredTodos }) {
  const { handleOpen } = useContext(FetchContext);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid sx={{ width: '100%' }}>
        {filteredTodos && filteredTodos.map((card) => (
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
                <ReactMarkdown>
                  {card.body}
                </ReactMarkdown>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
