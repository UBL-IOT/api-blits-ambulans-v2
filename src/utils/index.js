require("dotenv").config();
const format = require("date-fns-tz/format");
const id = require("date-fns/locale/id");
const logger = require("./logger");

/**
 * @function checkRequest
 * This method is used in express middleware. It will check the incoming request with required request.
 * @param {Object} requiredRequest
 * @returns {function(...[*]=)}
 */
const checkRequest = (requiredRequest) => {
  return async (req, res, next) => {
    let valid = true;

    for (const type in requiredRequest) {
      if (type === "file") {
        if (!(req.file.fieldname === requiredRequest[type])) {
          if (process.env.NODE_ENV !== "production") {
            logger.info("Missing 'file' field");
          }
          valid = false;
        }
      } else {
        requiredRequest[type].forEach((parameterName) => {
          if (!(parameterName in req[type])) {
            if (process.env.NODE_ENV !== "production") {
              logger.info(`Missing ${parameterName} field`);
            }
            valid = false;
          }
        });
      }
    }

    if (!valid) {
      res
        .json(requestResponse.unauthorized);
    } else {
      next();
    }
  };
};

/**
 * @function checkReqeuiredProperties
 * This method is an alternative method from checkRequest, but can be used more universal, not limited only to express middleware.
 * @param {Object} requiredProperties
 * @param {Object} properties
 * @returns {boolean}
 */
const checkRequiredProperties = (requiredProperties, properties) => {
  let valid = true;

  for (const type in requiredProperties) {
    requiredProperties[type].forEach((parameterName) => {
      if (!(parameterName in properties[type])) {
        if (process.env.NODE_ENV !== "production") {
          logger.info(`Missing ${parameterName} field`);
        }
        valid = false;
      }
    });
  }

  return valid;
};

const generateCollectionName = (code, name, object) => {
  let str = name.replace(/\s+/g, "_");
  let collectionName = object.toUpperCase() + "_" + code + "_" + str;
  return collectionName;
};

const generateUsername = (code, name) => {
  // let str = name.replace(/\s+/g, "_");
  let username = code.toUpperCase() + "_" + name;
  return username;
};

const generateCode = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getCurentDate = async () => {
  return format(new Date(), "dd-mm-yy, HH:mm:ss", { locale: id });
};

/**
 * @function parseTotalAttendance
 * The input is an array of object that produced from MongoDB aggregation process (see {@link getTotalAttendance}).
 * The goal is to destructure (or flatten) the array into a single object.
 * @param {Array} totalAttendance
 * @returns {{week, month, year, day}}
 */
const parseTotalAttendance = (totalAttendance) => {
  let { day, week, month, year } = totalAttendance[0];

  day = day.length === 0 ? 0 : day[0].total;
  week = week.length === 0 ? 0 : week[0].total;
  month = month.length === 0 ? 0 : month[0].total;
  year = year.length === 0 ? 0 : year[0].total;

  return { day, week, month, year };
};

const requiredRequest = {
  authorization: { headers: ["authorization"] },
  login: { body: ["email", "password"] },
  register: {
    fields: ["name", "email", "password", "phone_number"],
  },

  companies_by_app_type: {
    query: ["app-type"],
  },
};

const requestResponse = {
  success: {
    code: 200,
    status: true,
    message: "Berhasil Memuat Permintaan.",
  },
  incomplete_body: {
    code: 400,
    status: false,
    message: "Bad request. Please check your request data.",
  },
  authorized_failed: {
    code: 501,
    status: false,
    message: "Email atau password salah.",
  },
  unauthorized: {
    code: 401,
    status: false,
    message: "Unauthorized.",
  },
  not_found: {
    code: 404,
    status: false,
    message: "Gagal Memuat Permintaan",
  },
  unprocessable_entity: {
    code: 422,
    status: false,
    message: "The request you sent is unable to process",
  },
  server_error: {
    code: 500,
    status: false,
    message: "Internal server error. Please contact the administrator.",
  },
};

const role = {
  admin: 1,
  user: 2,
  driver: 3,
};

module.exports = {
  checkRequest,
  checkRequiredProperties,
  generateCollectionName,
  generateUsername,
  generateCode,
  getCurentDate,
  parseTotalAttendance,
  requiredRequest,
  requestResponse,
  role,
};
