import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';
import cardsRoutes from './routes/cards';

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '632c52e10053f19ca8e6dd8b'
  };

  next();
});

app.use('/users', usersRoutes);

app.use('/cards', cardsRoutes);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})