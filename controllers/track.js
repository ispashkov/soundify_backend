import mongoose from 'mongoose';
import transliter from 'translitit-cyrillic-russian-to-latin';
import Track from '../models/track';

/**
 * @description Create new track
 * @param {*} req 
 * @param {*} res 
 */
export const create = async (req, res) => {
	const track = new Track({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		artist: req.body.artist,
		photo: `/${req.file.path}`
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
 * @description Get all tracks
 * @param {*} req 
 * @param {*} res 
 */
export const getAll = async (req, res) => {
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
export const get = async (req, res) => {
	const track = await Track.findOne({ _id: req.params.id });

	try {
		res.status(200).json(track);
	} catch (error) {
		res.status(500).json({ error });
	}
};

/**
 * @description Remove track
 * @param {*} req 
 * @param {*} res 
 */
export const remove = async (req, res) => {
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
 * @description Update track
 * @param {*} req 
 * @param {*} res 
 */
export const update = async (req, res) => {
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
