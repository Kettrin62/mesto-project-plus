import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'Имя должно содержать не менее 2 символов'],
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Описание должно содержать не менее 2 символов'],
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Неверный адрес электронной почты'],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('user', userSchema);
