import { Router } from 'express';
import upath from 'upath';
import multer from 'multer';
import transliter from 'translitit-cyrillic-russian-to-latin';

const router = new Router();

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, upath.normalize('uploads/'));
	},
	filename: function(req, file, cb) {
		cb(null, transliter(file.originalname).replace(/\s/gi, '_'));
	}
});

const upload = multer({ storage });

import {
	addTrack,
	getAllTracks,
	getTrack,
	deleteTrack,
	editTrack
} from '../controllers/track';

router.post('/', upload.single('photo'), addTrack); // TODO: Добавить новый трек
router.get('/', getAllTracks); // TODO: Пролучить все треки
router.put('/:id', editTrack); // TODO: Изменить трек
router.get('/:id', getTrack); // TODO: Получить трек по id
router.delete('/:id', deleteTrack); // TODO: Удалить трек по id

export default router;
