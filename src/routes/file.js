import { Router } from 'express';
import upload from '@/middlewares/upload';
import * as FileController from '@/controllers/file';

const router = new Router();

/**
 * @description Upload new File
 * @method POST
 */
router.post('/create', upload.single('file'), FileController.create);

export default router;
