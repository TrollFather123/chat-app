const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      status: 201,
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err?.message,
    });
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await UserService.userLogin(email, password);

    if (!isUserExist.success) {
      return next(
        res.status(400).json({
          status: 400,
          message: isUserExist.message,
        })
      );
    }

    const token = jwt.sign(
      { userId: isUserExist.user._id, email: isUserExist.user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: 200,
      message: "user login successfully",
      data: isUserExist?.user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err?.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.userList();
    res.status(200).json({
      status: 200,
      message: users.message,
      data: users?.users,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err?.message,
    });
  }
};

const userController = {
  createUser,
  loginUser,
  getAllUsers
};

module.exports = userController;
