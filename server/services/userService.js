const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UserService {
  static async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
  static async userLogin(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { success: false, message: "User not found" };
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
      }

      return { success: true, user };
    } catch (error) {
      throw new Error("Error logging in user: " + error.message);
    }
  }
  static async userList(data) {
    try {
      const users = await User.find();
      return { message: "user fetched successfully", users };
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }
}

module.exports = UserService;
