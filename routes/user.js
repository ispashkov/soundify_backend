import { Router } from 'express';
import passport from 'passport';
import {
	userSignup,
	userLogin,
	userDelete,
	userCurrent
} from '../controllers/user';

const router = new Router();

router.post('/signup', userSignup); // TODO: Регистрация
router.post('/login', userLogin); // TODO: Авторизация
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	userCurrent
);
router.delete('/:userId', userDelete); // TODO: Удаление пользователя

export default router;
