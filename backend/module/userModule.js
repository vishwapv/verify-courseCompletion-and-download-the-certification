const User = require("../model/userModel");

exports.register = (body) => {
  return new Promise((resolve, reject) => {
    const { name, verificationCode } = body;
    console.log("body", body);
    console.log("verificationCode", body.verificationCode);

    if (!name || !verificationCode) {
      reject({
        message: "Provide all the credentials",
      });
    }

    User.find({ verificationCode: body.verificationCode })
      .then((user) => {
        console.log("user", user);

        if (user.length > 0) {
          console.log("user in if condition", user);

          reject({
            message: "user already there in the data base",
          });
        } else {
          var newProfile = new User({
            name: body.name,
            verificationCode: body.verificationCode,
          });
          newProfile.save().then((users) => {
            resolve(users);
          });
        }
      })
      .catch((err) => {
        reject({
          message: "user not able to save in the database",
          data: err,
        });
      });
  });
};

// check that user is there in the database or not
// if the user is not there in the database send the message that user is not there in the data base
// if user is there then get that user in the json formate
// send the message that user verified successfully
exports.verify = (body) => {
  return new Promise((resolve, reject) => {
    const { verificationCode } = body;
    console.log("verification code :", verificationCode);

    if (!verificationCode || verificationCode.length < 9) {
      reject({
        message: "provide proper verification code ",
      });
    }

    User.findOne({ verificationCode: body.verificationCode })
      .then((user) => {
        console.log("user in the data base", user);

        if (!user) {
          reject({ message: "user not found in the data base " });
        } else {
          resolve(user);
        }
      })
      .catch((e) => {
        reject({
          message: "error in find the user in the data base",
        });
      });
  });
};
