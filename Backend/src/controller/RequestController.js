const RequestModel = require('../model/request.model');
const moment = require('moment');
const historyModel = require('../model/history.model');
const { STATUS_REQUEST } = require('../config/constants');
const groupModel = require('../model/group.model');
const approveModel = require('../model/approve.model');

class RequestController {
  async createRequest(req, res) {
    try {
      let newRequestVal = {
        ...req.body,
        user: req.usr._id,
      };

      const currentDate = moment().format('L');
      if (
        moment(newRequestVal.from).format('L') < currentDate ||
        moment(newRequestVal.to).format('L') < currentDate ||
        moment(newRequestVal.to).format('L') < moment(newRequestVal.from).format('L')
      ) {
        return res.status(400).json({ message: 'The date must to be current date' });
      }
      const requests = await RequestModel.find({ user: req.usr._id });

      const checkExistedVals = requests.filter(
        (i) =>
          moment(i.from).date() === moment(newRequestVal.from).date() &&
          moment(i.to).date() === moment(newRequestVal.to).date(),
      );
      if (checkExistedVals.length >= 1)
        return res.status(400).json({ message: 'The request created before!' });

      const request = await RequestModel(newRequestVal);
      const createHistory = await request.populate('user', '-password');
      await request.save();

      const history = await historyModel({
        request: createHistory._id,
        created_request: { ...createHistory._doc },
        updated_request: null,
      });
      await history.save();

      res
        .status(200)
        .json({ message: 'Request saved successfully!', data: { ...createHistory._doc } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateRequest(req, res) {
    try {
      const objectCheckModified = (obj) => {
        const { from, to, reason, quantity, status, type_of_work } = obj;
        return {
          from: moment(from).format('L'),
          to: moment(to).format('L'),
          reason,
          quantity,
          status,
          type_of_work,
        };
      };
      const updateRequestObjCheck = objectCheckModified(req.body);
      const currentDate = moment().format('L');

      if (
        updateRequestObjCheck.from < currentDate ||
        updateRequestObjCheck.to < currentDate ||
        updateRequestObjCheck.to < updateRequestObjCheck.from
      ) {
        return res.status(400).json({ message: 'The date must to be current date' });
      }

      const oldRequest = await RequestModel.findOne({ _id: req.params.id, user: req.usr._id });
      const oldRequestCheck = objectCheckModified(oldRequest);

      if (JSON.stringify(oldRequestCheck) === JSON.stringify(updateRequestObjCheck))
        return res.status(400).json({ message: 'The request does not have any changes!' });

      if (!oldRequest || [STATUS_REQUEST[0], STATUS_REQUEST[1]].includes(oldRequest.status))
        return res.status(400).json({ message: 'The request was not found or closed!' });

      if (req.usr._id !== oldRequest.user.toString())
        return res.status(400).json({ message: 'The request is not yours' });

      const history = new historyModel({
        request: oldRequest._id,
        created_request: { ...oldRequest._doc },
      });
      await history.save();

      const updated = await RequestModel.findOneAndUpdate(
        { _id: oldRequest._id },
        { $set: { ...req.body, edit_at: new Date() } },
        { new: true },
      );

      await history.updateOne({ $set: { updated_request: { ...updated._doc } } }, { new: true });
      res
        .status(200)
        .json({ message: 'The request was updated successfully!', data: { ...updated._doc } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async aprroveRequest(req, res) {
    try {
      const { type_approve } = req.body;
      const request = await RequestModel.findOne({ _id: req.params.id });
      let mastersRelateUser = [];
      const groupMasterAppended = await groupModel.find();

      if (
        [STATUS_REQUEST[0], STATUS_REQUEST[1]].includes(request.status) ||
        moment(request.from).format('L') < moment().format('L')
      ) {
        return res.status(400).json({ message: 'The request was rejected or approved!' });
      }

      groupMasterAppended
        .filter((v) => v.masters.includes(request.user) || v.members.includes(request.user))
        .flatMap((v) => v.masters)
        .forEach((e) => {
          if (!mastersRelateUser.includes(e.toString())) {
            mastersRelateUser.push(e.toString());
          }
        });
      if (!mastersRelateUser.includes(req.usr._id)) {
        return res
          .status(400)
          .json({ message: 'You are not a master of user who created the request!' });
      } else if (mastersRelateUser.includes(request.user.toString())) {
        mastersRelateUser = mastersRelateUser.filter((v) => v !== request.user.toString());
      }

      const createApprove = new approveModel({
        type_approve,
        user: req.usr._id,
        request: req.params.id,
      });
      let savedApprove;

      const findApprove = await approveModel.findOne({ user: req.usr._id, request: req.params.id });
      if (findApprove) {
        return res.status(400).json({ message: 'You created a action on the request' });
      } else {
        savedApprove = await createApprove.save().then(async (t) => {
          const approves = await approveModel.find({ request: req.params.id });
          if (approves.length === mastersRelateUser.length) {
            if (approves.findIndex((v) => v.type_approve === STATUS_REQUEST[1]) > 0) {
              await RequestModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { status: STATUS_REQUEST[1] } },
                { new: true },
              );
            } else {
              await RequestModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { status: STATUS_REQUEST[0] } },
                { new: true },
              );
            }
          }
          return t.populate('user request', '-password');
        });
      }
      const history = new historyModel({
        request: req.params.id,
        approved_request: { ...savedApprove._doc },
      });
      history.save();
      res.status(200).json({
        message: 'The approve was successfully!',
        data: { ...savedApprove._doc },
      });
      console.log(mastersRelateUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async revertRequest(req, res) {
    try {
      const { reason } = req.body;
      const request = await RequestModel.findOne({ _id: req.params.id });
      if (
        request.status !== STATUS_REQUEST[0] ||
        moment(request.from).format('L') < moment().format('L')
      )
        return res.status(400).json({ message: 'The request was rejected' });
      console.log(req.usr._id);
      console.log(request.user);
      if (req.usr._id !== request.user.toString())
        return res.status(400).json({ message: 'The request is not yours' });
      const revertStatus = await RequestModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: STATUS_REQUEST[2] } },
        { new: true },
      );
      await approveModel.deleteMany({ request: req.params.id });
      const history = new historyModel({
        request: req.params.id,
        reverted_request: { ...revertStatus._doc, reason },
      });
      history.save();
      res
        .status(200)
        .json({ message: 'Revert the request successfully!', data: { ...revertStatus._doc } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getAllRequests(req, res) {
    try {
      await RequestModel.updateMany(
        { from: { $lt: new Date() } },
        { $set: { status: STATUS_REQUEST[1] } },
        { multi: true },
      ).then(async () => {
        const requests = await RequestModel.find();
        res.status(200).json({ message: 'Get the requests successfully!', data: [...requests] });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RequestController();
