import mongoose from 'mongoose';
import transliter from 'translitit-cyrillic-russian-to-latin';

import Track from '../models/track';

/**
 * Create new track
 * @param {*} req 
 * @param {*} res 
 */
export const addTrack = async (req, res) => {
	const host = req.headers.host;
	const track = new Track({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		artist: req.body.artist,
		photo: `http://${host}/${req.file.destination +
			transliter(req.file.originalname).replace(/\s/gi, '_')}`
	});

	try {
		const response = await track.save();

		res.status(200).json({
			message: 'New track has been added',
			track: response
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

/**
 * Get all tracks
 * @param {*} req 
 * @param {*} res 
 */
export const getAllTracks = async (req, res) => {
	try {
		const tracks = await Track.find();

		res.status(200).json({
			count: tracks.length,
			tracks
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

/**
 * Get track by id
 * @param {*} req 
 * @param {*} res 
 */
export const getTrack = async (req, res) => {
	const track = await Track.findOne({ _id: req.params.id });

	try {
		res.status(200).json(track);
	} catch (error) {
		res.status(500).json({ error });
	}
};

/**
 * Remove track
 * @param {*} req 
 * @param {*} res 
 */
export const deleteTrack = async (req, res) => {
	try {
		await Track.remove({ _id: req.params.id });
		res.status(200).json({
			message: 'Track deleted'
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

/**
 * Update track
 * @param {*} req 
 * @param {*} res 
 */
export const editTrack = async (req, res) => {
	try {
		const updateProps = {};

		for (let prop of req.body) {
			updateProps[prop.propName] = prop.value;
		}

		await Track.update({ _id: req.params.id }, { $set: updateProps });

		res.status(200).json({
			message: 'Track updated'
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};
