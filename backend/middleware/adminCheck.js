// Middleware to check if user has an Admin role to post/edit/delete books
const adminMiddleware = (req, res, next) => {
  // Check if user found after authorization
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('No authorization to modify resource');
  }
};

module.exports = adminMiddleware;
