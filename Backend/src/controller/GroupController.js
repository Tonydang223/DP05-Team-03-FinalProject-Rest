const GroupModel = require('../model/group.model');

class GroupController {
  async create(req, res) {
    const { name, id_workspace } = req.body;
    try {
      const existedGroup = await GroupModel.findOne({ name });
      if (existedGroup) return res.status(400).json({ message: 'Group already exists!' });
      const group = new GroupModel({
        name,
        workspace: id_workspace,
      });
      const newGroup = await group.save();
      res.status(200).json({ message: 'Group created successfully', data: { ...newGroup._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async addMembers(req, res) {
    try {
      if (Array.isArray(req.body) && req.body.length <= 1)
        return res.status(400).json({ message: 'Please add any member!' });
      let newMembers = [];
      for (const member of req.body) {
        newMembers.push(member._id);
      }

      const existedMembers = await GroupModel.findOne({
        _id: req.params.id,
      });
      if (!existedMembers) return res.status(400).json({ message: 'Group not found!' });

      newMembers = newMembers.filter((member) =>
        existedMembers._doc.added_users.length === 0
          ? member
          : !existedMembers._doc.added_users?.includes(member),
      );

      if (newMembers.length >= 1) {
        const addedUsers = await GroupModel.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { added_users: { $each: newMembers } } },
          { new: true },
        ).populate('added_users', '-password');

        res
          .status(200)
          .json({ message: 'Added users successfully!', data: addedUsers._doc.added_users });
      } else {
        res.status(400).json({ message: 'Added users is existed!' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const updatedGroup = await GroupModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { new: true },
      ).populate('added_users', '-password');
      res
        .status(200)
        .json({ message: 'Update the group successfully!', data: { ...updatedGroup._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new GroupController();
