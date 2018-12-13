export default (error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error
  });
};
