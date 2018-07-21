export const create = async (req, res) => {
	res.status(200).json({
		file: {
			filename: req.file.filename,
			url: `/${req.file.path}`
		}
	});
};
