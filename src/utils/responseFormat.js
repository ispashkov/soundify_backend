export default (err, req, res, next) => {
  if (err.status !== 404) {
    return next();
  }

  if (req.accepts("html")) {
    return res.send(err.message);
  }

  // respond with json
  if (req.accepts("json")) {
    return res.json({ error: err.message });
  }

  // default to plain-text. send()
  res.type("txt").send(err.message);
};
