const { constants } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
    console.log("ERROR HANDLER: ",err,res?.statusCode);
    console.log("ERROR HANDLER 2: ",constants.VALIDATION_ERROR);
  const STATUS = res?.statusCode ? res?.statusCode : 500;
  
  switch (STATUS) {
    case constants.VALIDATION_ERROR:
  
      res?.json({
        title: "VALIDATION ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZE:
      res?.json({
        title: "UNAUTHORIZE ACCESS",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res?.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res?.json({
        title: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res?.json({
        title: "SERVER ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("NO ERROR ALL GOOD....!");
      break;
  }
};

module.exports = errorHandler;
