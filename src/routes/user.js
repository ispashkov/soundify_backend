import { Router } from 'express';
const router = new Router();

import { userSignup, userLogin, userDelete } from '../controllers/user';

router.post('/signup', userSignup); // TODO: Регистрация
router.post('/login', userLogin); // TODO: Авторизация
router.delete('/:userId', userDelete); // TODO: Удаление пользователя

export default router;
