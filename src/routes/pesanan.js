const express = require("express");
const router = express.Router();
const pesanan_controllers = require("../controllers/pesanan_controller");
const { checkRequest, requiredRequest } = require("../utils");

router.post(
  "/input", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.inputPesanan
);

router.get(
  "/get-pesanan", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.getPesanan
);

router.get(
  "/:guid", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.getByGuidPesanan
);

router.get(
  "/byuser/:guid", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.getPesananByUser
);

router.get(
  "/historyByuser/:guid", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.historyByuser
);

router.get(
  "/historyByDriver/:guid", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.historyByDriver
);

router.get(
  "/bydriver/:guid", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.getPesananByDriver
);

router.get(
  "/get-by-status/:status", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.getStatusPesanan
);

router.put(
  "/update-pesanan/:guidpesanan", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.updatePesanan
);

router.get(
  "/filter/getPesananByDate/", //checkRequest(requiredRequest.authorization),
  pesanan_controllers.getPesananByDate
);

module.exports = router;
