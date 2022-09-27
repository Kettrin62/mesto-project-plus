import mongoose, { Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import UnauthorizedError from '../errors/unauthorized-err';
import {
  errorMessages,
  defaultDataUser,
} from '../utils/data';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string,
  ) => Promise<Document<unknown, any, IUser>>
}

const { name, about, avatar } = defaultDataUser;

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: [2, 'Имя должно содержать не менее 2 символов'],
    maxlength: 30,
    default: name,
  },
  about: {
    type: String,
    minlength: [2, 'Описание должно содержать не менее 2 символов'],
    maxlength: 200,
    default: about,
  },
  avatar: {
    type: String,
    default: avatar,
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
    minlength: [8, 'Пароль должен содержать не менее 8 символов'],
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(
    email: string,
    password: string,
  ) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          throw new UnauthorizedError(errorMessages.credentialsIncorrect);
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new UnauthorizedError(errorMessages.credentialsIncorrect);
            }
            return user;
          });
      });
  },
);

export default mongoose.model<IUser, UserModel>('user', userSchema);
