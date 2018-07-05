import upath from 'upath';
import multer from 'multer';
import transliter from 'translitit-cyrillic-russian-to-latin';
import moment from 'moment';

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, upath.normalize('uploads/'));
	},
	filename: function(req, file, cb) {
		cb(null, `${moment()}_${transliter(file.originalname).replace(/\s/gi, '_')}`);
	}
});

export default multer({ storage });
