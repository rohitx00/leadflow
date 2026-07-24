export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = new Error(`User role ${req.user?.role || 'unknown'} is not authorized to access this route`);
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};
