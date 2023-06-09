const mongoose = require("mongoose");
const collectionName = "pesanan";

const pesananSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
    },
    guid_user: {
      type: String,
    },
    guid_driver: {
      type: String,
    },
    paramedis: {
      type: String,
    },
    jenis_pesanan: {
      jenisPesanan: {
        type: String,
      },
      status: {
        type: String,
      }
    },
    kode_pesanan: {
      type: String,
    },
    tujuan: {
      type: String,
    },
    tujuan_lat: {
      type: String,
    },
    tujuan_long: {
      type: String,
    },
    titik_jemput: {
      type: String,
    },
    titik_jemput_lat: {
      type: String,
    },
    titik_jemput_long: {
      type: String,
    },
    tanggal: {
      type: Date,
      dafault: new Date(),
    },
    status_pesanan: {
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

module.exports = mongoose.model(collectionName, pesananSchema);
