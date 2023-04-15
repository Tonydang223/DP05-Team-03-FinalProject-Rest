const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password)
        return res.status(400).json({ message: 'Invalid email or password!' });
      const user = await UserModel.findOne({ email });

      if (!user) return res.status(409).json({ message: 'The user is not existed!' });
      const checkPass = await bcrypt.compareSync(password, user.password);
      if (!checkPass) return res.status(400).json({ message: 'The password not match!' });
      delete user.password;

      const token = accessToken({ _id: user._id, role: user.role });
      res.status(200).json({ message: 'Login sucessfully!', user, token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async changePassword(req, res) {
    const { password } = req.body;
    try {
      const user = await UserModel.findById({ _id: req.usr._id });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const oldPass = await bcrypt.compareSync(password, user.password);

      if (oldPass) return res.status(400).json({ message: 'The password is old!' });

      await UserModel.findByIdAndUpdate(
        { _id: req.usr._id },
        { $set: { password: hashPassword } },
        { new: true },
      );
      return res.status(200).json({ message: 'Your password was changed successfully!' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

const accessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '5d',
  });
};

module.exports = new AuthController();
