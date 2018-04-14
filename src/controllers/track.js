import mongoose from 'mongoose';
import transliter from 'translitit-cyrillic-russian-to-latin';

import Track from '../models/track';

// TODO: Добавить новый трек
export const addTrack = async (req, res, next) => {
	const host = req.headers.host;
	const product = new Track({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		artist: req.body.artist,
		photo: `http://${host}/${req.file.destination +
			transliter(req.file.originalname).replace(/\s/gi, '_')}`
	});

	try {
		const response = await product.save();

		res.status(200).json({
			message: 'New track has been added',
			track: response
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

// TODO: Пролучить все треки
export const getAllTracks = async (req, res) => {
	const tracks = await Track.find();

	try {
		res.status(200).json({
			count: tracks.length,
			tracks
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

// TODO: Получить трек по id
export const getTrack = async (req, res) => {
	const track = await Track.findOne({ _id: req.params.id });

	try {
		res.status(200).json(track);
	} catch (error) {
		res.status(500).json({ error });
	}
};

// TODO: Удалить трек по id
export const deleteTrack = async (req, res) => {
	try {
		const deletedTrack = await Track.remove({ _id: req.params.id });
		res.status(200).json({
			message: 'Track deleted'
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

// TODO: Изменить трек
export const editTrack = async (req, res) => {
	const updateProps = {};

	for (let prop of req.body) {
		updateProps[prop.propName] = prop.value;
	}

	const track = await Track.update(
		{ _id: req.params.id },
		{ $set: updateProps }
	);

	try {
		res.status(200).json({
			message: 'Track updated'
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};
