let pesanan_models = require("../models/pesanan_model");
const driver_models = require("../models/driver_model");
const paramedis_models = require("../models/paramedis_model");
const { requestResponse } = require("../utils");

const inputPesanan = async (data) => {
  // console.log(data);
  await pesanan_models.create(data);

  return { ...requestResponse.success, data: pesanan_models };
};

const getPesanan = async (condition) => {
  return pesanan_models.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "guid_user",
        foreignField: "guid",
        as: "data_user",
      },
    },
    {
      $unwind: { path: "$data_user", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "drivers",
        localField: "guid_driver",
        foreignField: "guid",
        as: "data_driver",
      },
    },
    {
      $unwind: { path: "$data_driver", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "paramedis",
        localField: "paramedis",
        foreignField: "guid",
        as: "data_paramedis",
      },
    },
    {
      $unwind: { path: "$data_paramedis", preserveNullAndEmptyArrays: true },
    },
  ]);
};

const getPesananByDate = async (condition) => {
  let startDate = new Date(condition.startDate);
  let endDate = new Date(condition.endDate);
  endDate.setDate(endDate.getDate() + 1);
  return pesanan_models.aggregate([
    {
      $match: {
        created_at: {
          $gte: startDate,
          $lt: endDate,
        },
        status_pesanan: Number(condition.status_pesanan),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "guid_user",
        foreignField: "guid",
        as: "data_user",
      },
    },
    {
      $unwind: { path: "$data_user", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "drivers",
        localField: "guid_driver",
        foreignField: "guid",
        as: "data_driver",
      },
    },
    {
      $unwind: { path: "$data_driver", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "paramedis",
        localField: "paramedis",
        foreignField: "paramedis",
        as: "paramedis",
      },
    },
    {
      $unwind: { path: "$data_paramedis", preserveNullAndEmptyArrays: true },
    },
  ]);
};

const getByGuidPesanan = async (condition) => {
  // return pesanan_models.findOne(condition, { _id: false }, { lean: true });
  return pesanan_models.aggregate([
    {
      $match: condition,
    },
    {
      $lookup: {
        from: "users",
        localField: "guid_user",
        foreignField: "guid",
        as: "data_user",
      },
    },
    {
      $unwind: "$data_user",
    },
    {
      $lookup: {
        from: "drivers",
        localField: "guid_driver",
        foreignField: "guid",
        as: "data_driver",
      },
    },
    // {
    //   $unwind: "$data_driver",
    // },
    {
      $unwind: { path: "$data_user", preserveNullAndEmptyArrays: true },
    },
  ]);
};

const getPesananByUser = async (condition) => {
  // return pesanan_models.findOne(condition, { _id: false }, { lean: true });
  return pesanan_models.aggregate([
    {
      $match: condition,
    },
    {
      $lookup: {
        from: "users",
        localField: "guid_user",
        foreignField: "guid",
        as: "data_user",
      },
    },
    {
      $lookup: {
        from: "drivers",
        localField: "guid_driver",
        foreignField: "guid",
        as: "data_driver",
      },
    },
    // {
    //   $unwind: "$data_driver",
    // },
    {
      $unwind: { path: "$data_user", preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: "$data_driver", preserveNullAndEmptyArrays: true },
    },
    { $sort: { _id: -1 } },
  ]);
};
const historyByuser = async (condition) => {
  // return pesanan_models.findOne(condition, { _id: false }, { lean: true });
  return pesanan_models.aggregate([
    {
      $match: condition,
    },
    {
      $lookup: {
        from: "users",
        localField: "guid_user",
        foreignField: "guid",
        as: "data_user",
      },
    },
    {
      $lookup: {
        from: "drivers",
        localField: "guid_driver",
        foreignField: "guid",
        as: "data_driver",
      },
    },
    // {
    //   $unwind: "$data_driver",
    // },
    {
      $unwind: { path: "$data_user", preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: "$data_driver", preserveNullAndEmptyArrays: true },
    },
    { $sort: { _id: -1 } },
  ]);
};

const getStatusPesanan = async (condition) => {
  return pesanan_models.find({ condition }, { _id: false }, { lean: true });
};

const updatePesanan = async (condition, body) => {
  await driver_models.updateOne(
    { guid: body.guid_driver },
    { status_driver: body.status_driver }
  );
  await pesanan_models.updateOne(condition, { ...body });
  return { ...requestResponse.success };
};

const pilihParamedis = async (condition, body) => {
  console.log(body);
  await paramedis_models.updateOne(
    { guid: body.paramedis },
    { status: body.status }
  );
  await pesanan_models.updateOne(condition, { ...body });
  return { ...requestResponse.success };
};

module.exports = {
  historyByuser,
  inputPesanan,
  getPesanan,
  getByGuidPesanan,
  getStatusPesanan,
  updatePesanan,
  getPesananByUser,
  getPesananByDate,
  pilihParamedis,
};
