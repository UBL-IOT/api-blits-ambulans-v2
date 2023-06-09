require("dotenv").config();
const model = require("../models/user_model");
const { requestResponse } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const privateKey = readFileSync("./private.key", "utf-8");

let response;
const login = async ({ no_telpon, password }) => {
  const user = await model.findOne(
    { no_telpon: no_telpon },
    { _id: false },
    { lean: true }
  );
  console.log(user);
  if (user === null) {
    response = { ...requestResponse.unauthorized };
    response.message = "nomor telpon tidak ditemukan."
    return response;
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  console.log(comparePassword);
  if (!comparePassword) {
    response = { ...requestResponse.unauthorized };
    response.message = "Password anda salah."
    return response;
  }
  if (user.role == 2) {
    if (user.verifikasi !== 1) {
      response = { ...requestResponse.unauthorized };
      response.message = "User anda belum terferivikasi."
      return response;
    }
  }
  const token = jwt.sign(
    {
      guid: user.guid,
      ...(user.email && { email: user.email }),
      ...(user.password && { password: user.password }),
      ...(user.role && { role: user.role }),
    },
    privateKey,
    {
      algorithm: "RS256",
    },
    {
      expiresIn: "7d",
    }
  );
  // console.log()

  const result = {
    ...requestResponse.success,
    data: {
      user,
      token,
    },
  };
  return result;
};

const login2 = async ({ username, password }) => {
  // console.log(password);
  const user = await model.findOne(
    { username: username },
    { _id: false },
    { lean: true }
  );
  // console.log(user)
  if (user === null) {
    response = { ...requestResponse.unauthorized };
    return response;
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  // console.log(comparePassword);
  if (!comparePassword) {
    return { ...requestResponse.authorized_failed };
  }
  const token = jwt.sign(
    {
      guid: user.guid,
      ...(user.username && { username: user.username }),
      ...(user.password && { password: user.password }),
      ...(user.role && { role: user.role }),
    },
    privateKey,
    {
      algorithm: "RS256",
    },
    {
      expiresIn: "7d",
    }
  );
  // console.log()

  const result = {
    ...requestResponse.success,
    data: {
      user,
      token,
    },
  };
  return result;
};

module.exports = {
  login,
  login2,
};
