import { Router } from 'express';
import passport from 'passport';
import upload from '@/middlewares/upload';
import * as TrackController from '@/controllers/track';

const router = new Router();

/**
 * @description Create new Track
 * @method POST
 */
router.post('/', upload.single('photo'), TrackController.create);

/**
 * @description Get all tracks
 * @method GET
 */
router.get('/', passport.authenticate('jwt', { session: false }), TrackController.getAll);

/**
 * @description Get single Track
 * @method GET
 * @param id
 */
router.get('/:id', TrackController.get);

/**
 * @description Update Track
 * @method PATCH
 * @param id
 */
router.patch('/:id', TrackController.update);

/**
 * @description Remove Track
 * @method DELETE
 * @param id
 */
router.delete('/:id', TrackController.remove); // TODO: Удалить трек по id

export default router;
