const UserModel = require("./UserModel");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const sendEmail = require("../../configs/email");
const { OtpTemplate } = require("../../configs/email/emailTemplates");

const getUserInfo = async (req, res) => {
  try {
    const UserData = await UserModel.find(
      {},
      { _id: 1, email: 1, name: 1, contact_number: 1 }
    );
    return res.status(200).send(UserData);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getAUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const UserData = await UserModel.find({ _id: id });
    return res.status(200).send(UserData);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await UserModel.findByIdAndDelete(ObjectId(req.params.id));
    if (response) {
      res.status(200).send("User Deleted");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const createUser = async (req, res) => {
  try {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const User = new UserModel({
      ...req.body,
      Otp: confirmationCode,
    });
    const response = await User.save();
    if (response) {
      const mailBody = {
        from: "admin@pizzeria.com",
        recipients: response.email,
        subject: "Account Verification Required",
        html: OtpTemplate(confirmationCode),
      };
      await sendEmail(mailBody);
      res
        .status(200)
        .send({ message: "Account Created! Please Verify", id: response._id });
    }
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({ message: "User already exist" });
    } else {
      res.send("Error in user creation");
    }
    console.log(err);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const response = await UserModel.findOne({ email: req.body.email });
    if (response && response.isVerified) {
      const isSame = await bcrypt.compare(req.body.password, response.password);
      if (isSame) {
        const token = jwt.sign(
          { user_id: response._id, role: response.role },
          process.env.TOKEN_KEY
        );
        const data = {
          _id: response._id,
          name: response.name,
          email: response.email,
          contact_number: response.contact_number,
        };

        return res.status(200).send({ token: token, data });
      } else {
        return res.status(400).send({ message: "Invalid password" });
      }
    } else {
      return res.status(400).send({ message: "User does not exist" });
    }
  } catch (err) {
    console.log("User Authentication Failure", err);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const response = await UserModel.findById(ObjectId(req.body.id));
    if (response) {
      if (response.Otp === req.body.otp) {
        await UserModel.findByIdAndUpdate(ObjectId(req.body.id), {
          isVerified: true,
        });
        res.status(200).send("Verified");
      }
    }
  } catch (err) {
    console.log("Verification Error", err);
  }
};

module.exports = {
  createUser,
  authenticateUser,
  getUserInfo,
  getAUserInfo,
  verifyOtp,
  deleteUser,
};
