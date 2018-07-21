import { Router } from 'express';
import passport from 'passport';
import upload from '@/middlewares/upload';
import * as AlbumController from '@/controllers/album';

const router = new Router();

const fields = [
	{ name: 'photo', maxCount: 1 },
	{ name: 'tracks', maxCount: 20 }
];

/**
 * @description Create new Album
 * @method POST
 */
router.post('/create', passport.authenticate('jwt', { session: false }), upload.fields(fields), AlbumController.create);

/**
 * @description Get all albums
 * @method GET
 */
router.get('/', AlbumController.getAll);

export default router;
