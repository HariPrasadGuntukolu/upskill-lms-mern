import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User Already Exist",
    });
  const hashPassword = await bcrypt.hash(password, 10);
  user = {
    name,
    email,
    password: hashPassword,
  };
  const otp = Math.floor(Math.random() * 1000000);
  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "UpSkill", data);

  res.status(200).json({
    message: "otp sent to your mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "OTP Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: " Wrong OTP",
    });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      message: "NO User With This Email",
    });
  const mathPassword = await bcrypt.compare(password, user.password);
  if (!mathPassword)
    return res.status(400).json({
      message: "Wrong Password",
    });
  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome Back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      message: "No User With This Email",
    });
  const token = jwt.sign({ email }, process.env.Forgot_Secret);
  const data = { email, token };

  await sendForgotMail("UpSkill", data);

  user.resetPasswordExpired = Date.now() + 5 * 60 * 1000;

  await user.save();

  res.json({
    message: " Reset Password Link Is Sent to Your Mail",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No User With This Email",
    });

  if (user.resetPasswordExpired === null)
    return res.status(400).json({
      message: "Token Expired",
    });

  if (user.resetPasswordExpired < Date.now()) {
    return res.status(400).json({
      message: "Token Expired",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);
  user.password = password;
  user.resetPasswordExpired = null;
  await user.save();

  res.json({ message: "Password Reset" });
});
