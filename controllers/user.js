import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

/**
 * Registration
 * @param {*} req 
 * @param {*} res 
 */
export const userSignup = (req, res) => {
	const { email, password } = req.body;

	User.find({ email }).then(user => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'Mail exists'
			});
		} else {
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: email,
						password: hash
					});

					user
						.save()
						.then(() => {
							res.status(201).json({
								message: 'User created'
							});
						})
						.catch(err => {
							res.status(500).json({
								error: err
							});
						});
				}
			});
		}
	});
};

/**
 * Login
 * @param {*} req 
 * @param {*} res 
 */
export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('User not found');
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				//User Matched

				const payload = {
					id: user._id,
					email: user.email
				};

				jwt.sign(
					payload,
					process.env.JWT_KEY,
					{
						expiresIn: '1h'
					},
					(err, token) => {
						res.status(200).json({
							message: 'Auth successful',
							token: `Bearer ${token}`,
							user: {
								id: user._id,
								email: user.email,
								admin: user.admin
							}
						});
					}
				);
			} else {
				res.status(400).json({
					error: 'Password incorrect'
				});
			}
		});
	} catch (err) {
		res.status(404).json({
			error: err.message
		});
	}
};

/**
 * Delete user
 * @param {*} req 
 * @param {*} res 
 */
export const userDelete = async (req, res) => {
	try {
		User.remove({ id: req.params.id });
		res.status(200).json({
			message: 'User deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: err
		});
	}
};

/**
 * Get current user
 * @param {*} req 
 * @param {*} res 
 */
export const userCurrent = (req, res) => {
	res.json({
		id: req.user._id,
		email: req.user.email,
		admin: req.user.admin
	});
};
