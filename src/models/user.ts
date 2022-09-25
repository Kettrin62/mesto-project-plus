import mongoose from 'mongoose';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'Имя должно содержать не менее 2 символов'],
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: [2, 'Описание должно содержать не менее 2 символов'],
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('user', userSchema);
