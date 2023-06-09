require("dotenv").config();
const rmq = require("amqplib/callback_api");
const { rmqUrl } = require("../config");
// if (process.env.NODE_ENV !== "production") {
//   neo4j.set("debug", true);
// }

/**
 * @function createConnection
 *
 * Create MongoDB connection. Configs are supplied automatically in the method
 * @returns {Promise<void>}
 */
const createConnection = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let rmqConn = await rmq.connect(rmqUrl, function (err, conn) {
        if (err) {
          console.log("[AMQP]", err.message);
          return setTimeout(createConnection, 5000);
        }
        conn.on("error", function (err) {
          if (err.message !== "Connection closing") {
            console.error("[AMQP] conn error", err.message);
            return setTimeout(createConnection, 5000);
          }
        });
        conn.on("close", function () {
          console.error("[AMQP] reconnecting");
          return setTimeout(createConnection, 1000);
        });
        resolve(conn);
      });
    } catch (error) {
      console.log("failed connect to rmq ");
      console.log("try to connect RMQ in 5 sec ..");
      setTimeout(function () {
        createConnection();
      }, 5000);
    }
  });
};

module.exports = {
  createConnection,
};
