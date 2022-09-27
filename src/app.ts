import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';
import cardsRoutes from './routes/cards';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import defaultError from './middlewares/default-error';
import {
  requestLogger,
  errorLogger,
} from './middlewares/logger';

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use(defaultError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
