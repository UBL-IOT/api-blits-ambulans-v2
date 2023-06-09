const authService = require("../services/auth_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");

let response;

const login = async (req, res) => {
  let loginResponse;
  try {
    const { no_telpon, password, role } = req.body;
    loginResponse = await authService.login({ no_telpon, password, role });
    response = { ...loginResponse };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }

  res.json(response);
};

const login2 = async (req, res) => {
  let loginResponse;
  try {
    const { username, password, role } = req.body;
    loginResponse = await authService.login2({ username, password, role });
    response = { ...loginResponse };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }

  res.json(response);
};

module.exports = {
  login,
  login2,
};
