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

import { createAlbum, getAlbums } from '../controllers/album';

router.post('/create', upload.single('photo'), createAlbum); // TODO: Добавить новый альбом
router.get('/', getAlbums); // TODO: Получить все альбомы

export default router;
