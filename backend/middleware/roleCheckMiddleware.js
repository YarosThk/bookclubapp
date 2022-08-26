// Middleware that checks wheter user has Admin role
const roleCheckMiddleware = (req, res, next) => {
  // Check if user found after authorization
  if (!req.user.id) {
    res.status(401);
    throw new Error('User not found');
  }
  const requestorId = req.user.id.toString();
  const postedBy = req.postedBy.toString();
  if (req.user.role === 'admin' || requestorId === postedBy) {
    next();
  } else {
    res.status(403);
    throw new Error('No authorization to modify resource');
  }
};

module.exports = roleCheckMiddleware;
