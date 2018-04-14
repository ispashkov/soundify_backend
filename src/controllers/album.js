import mongoose from 'mongoose';
import transliter from 'translitit-cyrillic-russian-to-latin';

import Album from '../models/album';

// TODO: Добавить новый альбом
export const createAlbum = async (req, res) => {
	const host = req.headers.host;
	const album = new Album({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		type: req.body.type,
		artist: req.body.name,
		photo: `http://${host}/${req.file.destination +
			transliter(req.file.originalname).replace(/\s/gi, '_')}`
	});

	try {
		const response = await album.save();
		res.status(200).json({
			message: 'New album has been created',
			album: response
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

// TODO: Получить все альбомы
export const getAlbums = async (req, res) => {
	const albums = await Album.find();

	try {
		res.status(200).json({
			count: albums.length,
			albums
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};
