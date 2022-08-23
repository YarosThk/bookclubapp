// Middleware that checks wheter user has Admin role
const adminAuthMiddleware = (req, res, next) => {
  if (req.user.role === 'admin') {
    res.status(200);
    next();
  } else {
    res.status(403);
    throw new Error('No Admin authorization');
  }
};

module.exports = adminAuthMiddleware;
