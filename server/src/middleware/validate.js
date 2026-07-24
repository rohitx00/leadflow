export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    const error = new Error('Validation Error');
    error.statusCode = 400;
    error.errors = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
    next(error);
  }
};
