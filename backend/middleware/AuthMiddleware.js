const jwt = require("jsonwebtoken");

const authMiddleware = async (request, response, next) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
      const token = await authorizationHeader.split(" ")[1];
      const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
      if (verifyUser) {
        const userId = verifyUser.userId;
        next();
      } else {
        return response.status(401).json({
          message: "user unauthorized",
        });
      }
    } else {
      return response.status(401).json({
        message: "user not recognize",
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: "error",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
