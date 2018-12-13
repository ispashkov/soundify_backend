/**
 * @description Get current user
 * @param {*} req
 * @param {*} res
 */
export default (req, res) => res.json({ ...req.user, password: null });
