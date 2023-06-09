require("dotenv").config();
const pesanan_service = require("../services/pesanan_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const { v4 } = require("uuid");
let response;
const rmq = require("../db_config/rmq");
// const rmq = require("amqplib/callback_api");
const { rmqUrl } = require("../config");
// const inputPesanan = async (req, res) => {
//   try {
//     req.body.guid = v4();
//     console.log(req.body);
//     const data = await pesanan_service.inputPesanan(req.body);
//     response = { ...data };
//   } catch (error) {
//     logger.error(error);
//     response = { ...requestResponse.server_error };
//   }
//   console.log(response);
//   res.json(response);
// };

const inputPesanan = async (req, res) => {
  try {
    const con = req.app.get("rmqconfig");
    
    req.body.guid = v4();
    console.log(req.body);
    const data = await pesanan_service.inputPesanan(req.body);
    // await rmq.createConnection().then(async (con) => {
      // console.log("dsadsa")
      // let con = app
      await con.createChannel(async function (error1, channel) {
        if (error1) {
          console.log(error1) ;
        }

        var exchange = 'amq.topic';
        var queue = 'order_notif';
        var msg = Buffer.from(req.body.rmq, "utf-8");
        var routkey = 'orderan'
        await channel.publish(exchange, routkey, msg,
          (err) => {
            if (err) {
              console.error("[AMQP] publish", err);
              channel.connection.close();
              return;
            }
            // channel.connection.close();
          })

      });

    // })

    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  console.log(response);
  res.json(response);
};

const getPesanan = async (req, res) => {
  try {
    const data = await pesanan_service.getPesanan();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getByGuidPesanan = async (req, res) => {
  try {
    console.log(req.params);
    const data = await pesanan_service.getByGuidPesanan({
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

const getPesananByUser = async (req, res) => {
  try {
    console.log(req.params);
    const data = await pesanan_service.getPesananByUser({
      guid_user: req.params.guid,
    });
    console.log(data);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const historyByuser = async (req, res) => {
  try {
    console.log(req.params);
    const data = await pesanan_service.historyByuser({
      guid_user: req.params.guid,
      status_pesanan: 3,
    });
    console.log(data);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const historyByDriver = async (req, res) => {
  try {
    console.log("ya");
    const data = await pesanan_service.historyByuser({
      guid_driver: req.params.guid,
      status_pesanan: 3,
    });
    console.log(data);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getPesananByDriver = async (req, res) => {
  try {
    console.log(req.params);
    const data = await pesanan_service.getPesananByUser({
      guid_driver: req.params.guid,
    });
    console.log(data);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getStatusPesanan = async (req, res) => {
  try {
    const data = await pesanan_service.getStatusPesanan({
      status: req.params.status,
    });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const updatePesanan = async (req, res) => {
  try {
    let data;
    req.body.updated_at = new Date();
    const { status_pesanan, status_driver, guid_driver } = req.body;
    console.log(req.body.guid_paramedis);
    if (req.body.guid_paramedis === undefined) {
      data = await pesanan_service.updatePesanan(
        { guid: req.params.guidpesanan },
        {
          status_pesanan: status_pesanan,
          status_driver: status_driver,
          guid_driver: guid_driver,
        }
      );
    } else {
      data = await pesanan_service.pilihParamedis(
        { guid: req.params.guidpesanan },
        { paramedis: req.body.guid_paramedis, status: req.body.status }
      );
    }
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getPesananByDate = async (req, res) => {
  try {
    console.log(req.query);
    const data = await pesanan_service.getPesananByDate(req.query);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

module.exports = {
  historyByDriver,
  historyByuser,
  getPesananByDriver,
  inputPesanan,
  getPesanan,
  getByGuidPesanan,
  getStatusPesanan,
  updatePesanan,
  getPesananByUser,
  getPesananByDate,
};
