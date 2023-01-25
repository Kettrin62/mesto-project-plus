export const errorMessages = {
  userNotFound: 'Запрашиваемый пользователь не найден',
  cardNotFound: 'Такой карточки не существует',
  default: 'На сервере произошла ошибка',
  userIncorrectData: 'Переданы некорректные данные для пользователя',
  cardIncorrectData: 'Переданы некорректные данные для карточки',
  fordbiddenCardDelete: 'Удаление чужой карточки недоступно',
  unauthorized: 'Необходима авторизация',
  credentialsIncorrect: 'Неправильные почта или пароль',
  userExists: 'Пользователь с такой почтой уже существует',
  invalidId: 'Невалидный id',
  invalidToken: 'Невалидный токен',
};

export const defaultDataUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

export const regexUrl = /^https?:\/\/([\d\w.-]+)\.([\w.]{2,6})(\/?\S+)?$/;
export const regexAuth = /[a-z0-9-]/;
export const regexId = /^[a-f0-9]{24}$/;
