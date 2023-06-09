const bcrypt = require("bcrypt");
const user_model = require("../models/user_model");
const driver_models = require("../models/driver_model");
const { requestResponse, getRndInteger } = require("../utils");

let response;
const registrasi = async (data) => {
  const cekData = await user_model.findOne(
    { no_telpon: data.no_telpon },
    { _id: false },
    { lean: true }
  );

  if (cekData !== undefined && cekData !== null) {
    response = { ...requestResponse.unprocessable_entity };
    response.message = "No Telepon ini sudah terdaftar.";
    return response;
  }

  const saltRounds = 12;
  const hashPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashPassword;

  await user_model.create(data);

  return { ...requestResponse.success, data: user_model };
};

const registrasiDriver = async (data) => {
  console.log(data);
  const cekData = await user_model.findOne(
    { no_telpon: data.no_telpon },
    { _id: false },
    { lean: true }
  );

  if (cekData !== undefined && cekData !== null) {
    response = { ...requestResponse.unprocessable_entity };
    response.message = "User ini sudah terdaftar.";
    return response;
  }

  // const cekDataPlat = await driver_models.findOne({ no_plat: data.no_plat }, { _id: false }, { lean: true });
  
  // if (cekDataPlat !== undefined && cekDataPlat !== null) {
  //   response = { ...requestResponse.unprocessable_entity };
  //   response.message = "Maaf no plat ini sudah tedaftar.";
  //   return response;
  // }
  data.password = "driver123"
  const saltRounds = 12;
  const hashPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashPassword;

  await user_model.create(data);
  await driver_models.create(data);

  return { ...requestResponse.success, data: user_model };
};

const getByGuid = async (condition) => {
  return user_model.findOne(condition, { _id: false }, { lean: true });
};

const getAllUser = async () => {
  return user_model.find({}, { _id: false }, { lean: true });
};

const getRoleAdmin = async (condition) => {
  return user_model.find(condition, { _id: false }, { lean: true });
};

const getRoleUser = async (condition) => {
  return user_model.find(condition, { _id: false }, { lean: true });
};

const getRoleDriver = async (condition) => {
  return user_model.find(condition, { _id: false }, { lean: true });
};

const userUpdate = async (condition, body) => {
  const update = await user_model.updateOne(condition, body);
  const user = await user_model.findOne(condition, { _id: false }, { lean: true })
  return { ...requestResponse.success, user };
  // return model.findOne(condition, { _id: false }, { lean: true });
};

module.exports = {
  registrasi,
  getAllUser,
  getRoleAdmin,
  getRoleUser,
  getRoleDriver,
  registrasiDriver,
  userUpdate,
  getByGuid
};
