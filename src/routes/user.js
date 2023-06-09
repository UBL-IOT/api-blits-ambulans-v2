const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user_controller");
const { checkRequest, requiredRequest } = require("../utils");

router.post("/create", controllers.registrasi);

router.post("/registrasiDriver", controllers.registrasiDriver);

router.get(
  "/:guid",
  // checkRequest(requiredRequest.authorization),
  controllers.getByGuid
);

router.get(
  "/get/all",
  // checkRequest(requiredRequest.authorization),
  controllers.getAllUser
);

router.get(
  "/get/role-admin",
  // checkRequest(requiredRequest.authorization),
  controllers.getRoleAdmin
);

router.get(
  "/get/role-user",
  checkRequest(requiredRequest.authorization),
  controllers.getRoleUser
);

router.get(
  "/get/role-driver",
  checkRequest(requiredRequest.authorization),
  controllers.getRoleDriver
);

router.put(
  "/user-update/:guid",
  // checkRequest(requiredRequest.authorization),
  controllers.userUpdate
);

module.exports = router;
