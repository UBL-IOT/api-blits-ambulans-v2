var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
let model = require("../models/" + filename[0] + "_model");
const { requestResponse } = require("../utils");
const create = async (data) => {
  // const cekData = await model.findOne(
  //   { instansi_code: data.instansi_code, nip: data.nip },
  //   { _id: false },
  //   { lean: true }
  // );

  // if (cekData !== undefined && cekData !== null) {
  //   response = { ...requestResponse.unprocessable_entity };
  //   response.message = "Beasiswa ini sudah terdaftar.";
  //   // console.log(response)
  //   return response;
  // }
  await model.create(data);

  return { ...requestResponse.success, data: model };
};

const get = async (condition) => {
  return model.find(condition, { _id: false }, { lean: true });
};
const getById = async (condition) => {
  return model.findOne(condition, { _id: false }, { lean: true });
};

const updateOne = async (condition, body) => {
  return model.updateOne(condition, body);
};

const deleteOne = async (condition) => {
  return model.deleteOne(condition);
};

module.exports = {
  create,
  get,
  getById,
  updateOne,
  deleteOne,
};
