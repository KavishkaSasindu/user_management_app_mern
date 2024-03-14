const getUserData = async (request, response) => {
  return response.status(200).json({
    message: "Hello User",
  });
};

module.exports = { getUserData };
