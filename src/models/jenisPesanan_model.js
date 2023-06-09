const mongoose = require("mongoose");
var path = require("path");
var scriptName = path.basename(__filename);
const colname = scriptName.split("_");
const collectionName = colname[0];
const moment = require("moment");
let date = moment().format("YYYY-MM-D");
const userSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
    },
    instansi_code: {
      type: String,
    },
    app_code: {
      type: String,
    },
    jenisPesanan: {
      type: String,
    },
    status: {
      type: String,
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

module.exports = mongoose.model(collectionName, userSchema);
