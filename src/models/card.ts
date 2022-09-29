import mongoose, { Schema } from 'mongoose';
import User from './user';
import { regexUrl } from '../utils/data';

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Array<Schema.Types.ObjectId>;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: [2, 'Название должно содержать не менее 2 символов'],
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (
        value: string,
      ) => regexUrl.test(value),
      message: 'Неправильная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    default: [],
    ref: User,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
