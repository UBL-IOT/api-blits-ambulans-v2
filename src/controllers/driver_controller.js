require("dotenv").config();
const driver_service = require("../services/driver_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const { v4 } = require("uuid");
let response;

const inputDriver = async (req, res) => {
  try {
    req.body.guid = v4();
    console.log(req.body);
    const data = await driver_service.inputDriver(req.body);
    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getDriver = async (req, res) => {
  try {
    const data = await driver_service.getDriver();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getDriverByDate = async (req, res) => {
  try {
    console.log(req.query);
    console.log("asdsa");
    const data = await driver_service.getDriverByDate(req.query);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getByGuidDriver = async (req, res) => {
  try {
    console.log(req.params);
    const data = await driver_service.getByGuidDriver({
      guid: req.params.guid,
    });
    console.log(data);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getDetailDriver = async (req, res) => {
  try {
    console.log(req.params);
    const data = await driver_service.getDetailDriver({
      guid: req.params.guid,
    });
    console.log(data);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const updateDriver = async (req, res) => {
  try {
    req.body.updated_at = new Date();
    const data = await driver_service.updateDriver(
      { guid: req.params.guid },
      req.body
    );

    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getCount = async (req, res) => {
  try {
    const data = await driver_service.getCount();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

module.exports = {
  inputDriver,
  getDriver,
  getByGuidDriver,
  updateDriver,
  getCount,
  getDetailDriver,
  getDriverByDate,
};
