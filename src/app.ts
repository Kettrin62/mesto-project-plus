import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '632c52e10053f19ca8e6dd8b'
  };

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})