const GroupModel = require('../model/group.model');

class GroupController {
  async create(req, res) {
    const { name, id_workspace, masters, members } = req.body;
    try {
      const existedGroup = await GroupModel.findOne({ name });
      if (existedGroup) return res.status(400).json({ message: 'Group already exists!' });

      const checkMembers = (mem) => {
        if (!mem || !Array.isArray(mem) || mem.length < 1)
          return res.status(400).json({ message: 'Group must have at least one member!' });
      };

      checkMembers(members);
      checkMembers(masters);
      const group = new GroupModel({
        name,
        workspace: id_workspace,
      });

      await group.save();

      const groupAdded = await GroupModel.findByIdAndUpdate(
        { _id: group._id },
        { $push: { masters: { $each: masters }, members: { $each: members } } },
        { new: true },
      ).populate('members masters', '-password');

      res.status(200).json({ message: 'Group created successfully', data: { ...groupAdded._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async updateGroup(req, res) {
    try {
      const { masters, members, name } = req.body;
      const existedMembers = await GroupModel.findOne({
        _id: req.params.id,
      });
      const arrayIds = (arr, fieldArr) => {
        if (Array.isArray(arr) && arr.length > 0) {
          return arr.filter(
            (member) =>
              !existedMembers._doc[`${fieldArr}`]?.map((v) => v.toString())?.includes(member),
          );
        }
      };
      const masterIds = arrayIds(masters, 'masters');
      const memberIds = arrayIds(members, 'members');

      if (!existedMembers) return res.status(400).json({ message: 'Group not found!' });

      const addedUsers = await GroupModel.findByIdAndUpdate(
        { _id: existedMembers._id },
        {
          $push: { masters: { $each: masterIds }, members: { $each: memberIds } },
          $set: { name },
        },
        { new: true },
      ).populate('masters members', '-password');

      res.status(200).json({ message: 'Added users successfully!', data: { ...addedUsers._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getGroups(req, res) {
    try {
      const groups = await GroupModel.find().populate('members masters workspace', '-password');
      res.status(200).json({ message: 'Get groups successfully', data: [...groups] });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getDetailGroup(req, res) {
    try {
      const group = await GroupModel.findOne({ _id: req.params.id }).populate(
        'members masters workspace',
        '-password',
      );
      res.status(200).json({ message: 'Get detail group successfully', data: { ...group._doc } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new GroupController();
