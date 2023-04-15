const WorkSpaceModel = require('../model/workspace.model');

class WorkSpaceController {
  constructor() {}

  async create(req, res) {
    const { name, status } = req.body;
    try {
      const existedWspace = await WorkSpaceModel.findOne({ name });
      if (existedWspace) return res.status(400).json({ message: 'Workspace already exists!' });
      const savedworkspace = new WorkSpaceModel({
        name,
        status,
      });
      const newworkspace = await savedworkspace.save();
      res.status(200).json({ message: 'Create workspace successfully!', data: newworkspace });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const workspaceUpdated = await WorkSpaceModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { new: true },
      );
      res
        .status(200)
        .json({ message: 'Create workspace successfully!', data: { ...workspaceUpdated } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async changeStatus(req, res) {
    try {
      const workspaceUpdated = await WorkSpaceModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: req.body.status } },
        { new: true },
      );
      res
        .status(200)
        .json({ message: 'Create workspace successfully!', data: { ...workspaceUpdated } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new WorkSpaceController();
