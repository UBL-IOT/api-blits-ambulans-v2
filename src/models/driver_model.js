const mongoose = require("mongoose");
const collectionName = "drivers";

const driverSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
    },
    instansi: {
      type: String,
    },
    no_plat: {
      type: String,
    },
    username: {
      type: String,
    },
    no_telpon: {
      type: String,
    },
    nama_driver: {
      type: String,
    },
    alamat: {
      type: String,
    },
    status_driver: {
      type: Number,
    },
    created_at: {
      type: Date,
      default: new Date(),
    },
    updated_at: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    collection: collectionName,
  }
);

module.exports = mongoose.model(collectionName, driverSchema);
