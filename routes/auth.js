import { Router } from 'express';
import passport from 'passport';
import * as UserController from '../controllers/user';

const router = new Router();

/**
 * @description Create new user
 * @method POST
 */
router.post('/signup', UserController.signup);

/**
 * @description Login user
 * @method POST
 */
router.post('/login', UserController.login);

/**
 * @description Get current user
 * @method GET
 */
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	UserController.current
);

/**
 * @description Remove user
 * @method DELETE
 * @param id
 */
router.delete('/:id', UserController.remove);

export default router;
