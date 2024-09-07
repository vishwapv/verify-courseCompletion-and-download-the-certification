const express = require("express");
var UserController = require("../module/userModule");

module.exports = function () {
  var router = express.Router();

  router.post("/", (req, res) => {
    console.log(" i reached routes");

    UserController.register(req.body)
      .then((result) => {
        return res.status(201).json({
          message: "user registered successfully",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: "Error registering the user",
          error: error,
        });
      });
  });

  router.post("/verify", (req, res) => {
    UserController.verify(req.body)
      .then((result) => {
        return res.status(201).json({
          message: "User verified successfully",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: "Error in finding the user in the database ",
          data: error,
        });
      });
  });
  return router;
};
