const user_service = require("../services/user_service");
const { requestResponse, role } = require("../utils");
const logger = require("../utils/logger");
const { v4 } = require("uuid");
let response;

const registrasi = async (req, res) => {
  try {
    req.body.guid = v4();
    console.log(req.body);
    const user = await user_service.registrasi(req.body);
    response = { ...user };
  } catch (err) {
    logger.error(err);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const getByGuid = async (req, res) => {
  try {
    req.body.guid = v4();
    console.log(req.body);
    const data = await user_service.getByGuid({
      guid: req.params.guid,
    });
    // const user = await user_service.getByGuid(req.body);
    response = { ...requestResponse.success, data };
  } catch (err) {
    logger.error(err);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const registrasiDriver = async (req, res) => {
  try {
    req.body.guid = v4();
    req.body.fullname = req.body.nama_driver;
    req.body.role = 3; // role driver
    const user = await user_service.registrasiDriver(req.body);
    response = { ...user };
  } catch (err) {
    logger.error(err);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const getAllUser = async (req, res) => {
  try {
    const data = await user_service.getAllUser();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getRoleAdmin = async (req, res) => {
  try {
    console.log("asdsa");
    const data = await user_service.getRoleAdmin({ role: role.admin });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getRoleUser = async (req, res) => {
  try {
    const data = await user_service.getRoleUser({ role: role.user });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getRoleDriver = async (req, res) => {
  try {
    const data = await user_service.getRoleDriver({ role: role.driver });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const userUpdate = async (req, res) => {
  try {
    req.body.updated_at = new Date();
    const data = await user_service.userUpdate(
      { guid: req.params.guid },
      req.body
    );

    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

module.exports = {
  registrasi,
  getAllUser,
  getRoleAdmin,
  getRoleUser,
  getRoleDriver,
  userUpdate,
  registrasiDriver,
  getByGuid,
};
