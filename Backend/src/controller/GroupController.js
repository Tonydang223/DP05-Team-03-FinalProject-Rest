const { ROLES } = require('../config/constants');
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
      const { masters, members, name } = req.body;
      const existedMembers = await GroupModel.findOne({
        _id: req.params.id,
      });
      const arrayIds = (arr, fieldArr) => {
        if (Array.isArray(arr) && arr.length > 0) {
          return arr
            .filter((v) => ![ROLES[0], ROLES[1]].includes(v.role))
            .map((i) => i._id)
            .filter((member) =>
              existedMembers._doc[`${fieldArr}`]?.length === 0
                ? member
                : !existedMembers._doc[`${fieldArr}`]?.includes(member),
            );
        }
      };
      const masterIds = arrayIds(masters, 'masters');
      const memberIds = arrayIds(members, 'members');

      if (!existedMembers) return res.status(400).json({ message: 'Group not found!' });

      const addedUsers = await GroupModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { masters: { $each: masterIds }, members: { $each: memberIds } }, $set: { name } },
        { new: true },
      ).populate('masters members', '-password');

      res.status(200).json({ message: 'Added users successfully!', data: { ...addedUsers._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new GroupController();
