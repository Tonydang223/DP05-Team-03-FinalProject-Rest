const { ROLES } = require('../config/constants');
const { web } = require('../config/slackBot');
const { upload } = require('../config/uploadCloud');
const notiModel = require('../model/noti.model');
const UserModel = require('../model/user.model');
const workspaceModel = require('../model/workspace.model');
const WorkspaceModel = require('../model/workspace.model');

class UserController {
  async createUser(req, res) {
    try {
      const { firstName, lastName, email, password, role, slackId, idWs } = req.body;
      const result = await web.users.list();
      const usrs = result.members.filter((v) => !v.is_admin && !v.is_bot && v.profile.email);
      const noti = await notiModel.find();
      //MAPPING NOTI BY EMAIL
      if (slackId && !usrs.map((v) => v.id).includes(slackId)) {
        if (
          noti[0].workSpace.isMappingByEmail &&
          usrs.findIndex((i) => i.profile.email === email) === -1
        ) {
          return res.status(400).json({ message: 'The email is not included in slack!' });
        }
        return res.status(400).json({ message: 'The slackId is not existed!' });
      }
      const existedUser = await UserModel.findOne({ email });
      if (existedUser) return res.status(400).json({ message: 'User already exists!' });
      const user = new UserModel({
        firstName,
        lastName,
        slackId,
        email,
        password,
        role,
      });
      //ADMIN CREATE MANAGER
      if (req.usr.role === ROLES[0]) {
        if (idWs) {
          await workspaceModel.findOneAndUpdate(
            { _id: idWs },
            { $push: { user: user._id } },
            { new: true },
          );
        } else {
          return res.status(400).json({ message: 'The id workspace not include!' });
        }
      }
      const savedUser = await user.save();

      const newUser = { ...savedUser._doc };
      delete newUser.password;

      res.status(200).send({ message: 'Created user successfully!', data: { ...newUser } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async updateProfile(req, res) {
    try {
      const updateNews = { ...req.body };
      if (req.file) {
        const link = await upload(
          req.file.path,
          'avatar',
          { w: 180, h: 180 },
          `${req.usr._id}_profile`,
        );
        updateNews['img_profile'] = link.url;
      }

      const user = await UserModel.findOneAndUpdate(
        { _id: req.usr._id },
        { $set: updateNews },
        { new: true },
      );
      res.status(200).json({ message: 'Update successfully!', user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const userDeleted = await UserModel.findOneAndRemove({ _id: req.params.id });
      if (!userDeleted) return res.status(400).json({ message: 'User not found!' });
      await WorkspaceModel.findByIdAndUpdate(
        { _id: req.body.id_workspace },
        { $pull: { user: userDeleted._id } },
        { new: true },
      );
      res.status(200).json({ message: 'Delete successfully!', data: { ...userDeleted } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getProfile(req, res) {
    try {
      const user = await UserModel.findOne({ _id: req.usr._id }).select('-password');
      res.status(200).json({ message: 'Get user successfully', data: { ...user._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await UserModel.find({ role: ROLES[2] }).select('-password');
      res.status(200).json({ message: 'Get users successfully', data: [...users] });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async isActiveMappingByEmail(req, res) {
    try {
      const noti = await notiModel.find();
      await noti[0].update(
        { $set: { isMappingByEmail: req.body.isMappingByEmail } },
        { new: true },
      );
      res.status(200).json({ message: 'Update noti successfully!' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new UserController();
