const RequestModel = require('../model/request.model');
const moment = require('moment');
const historyModel = require('../model/history.model');
const { STATUS_REQUEST, MAIN_CHANNELS } = require('../config/constants');
const groupModel = require('../model/group.model');
const approveModel = require('../model/approve.model');
const { addRows } = require('../utils/googleSheet');
const { getMainChannels, pushMessage } = require('../config/slackBot');
const { formatStringNotiRequest } = require('../utils/index');

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

      const request = new RequestModel(newRequestVal);
      const createHistory = await request.populate('user', '-password');
      await request.save();

      const history = new historyModel({
        request: createHistory._id,
        created_request: {
          ...createHistory._doc,
          userName: `${createHistory._doc.user.firstName} ${createHistory._doc.user.lastName}`,
        },
        updated_request: null,
        action: 'Created',
      });
      await history.save();

      //noti
      const mainChannels = await getMainChannels(MAIN_CHANNELS);
      const notis = [...mainChannels, createHistory._doc.user.slackId];

      await pushMessage(notis, formatStringNotiRequest(createHistory));

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
        action: 'Updated',
      });
      await history.save();

      const updated = await RequestModel.findOneAndUpdate(
        { _id: oldRequest._id },
        { $set: { ...req.body, edit_at: new Date() } },
        { new: true },
      ).populate('user', '-password');

      await history.updateOne(
        {
          $set: {
            updated_request: {
              ...updated._doc,
              userName: `${updated._doc.user.firstName} ${updated._doc.user.lastName}`,
            },
          },
        },
        { new: true },
      );
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
            let updateSta;
            if (approves.findIndex((v) => v.type_approve === STATUS_REQUEST[1]) > 0) {
              updateSta = await RequestModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { status: STATUS_REQUEST[1] } },
                { new: true },
              ).populate('user', '-password');
            } else {
              updateSta = await RequestModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { status: STATUS_REQUEST[0] } },
                { new: true },
              ).populate('user', '-password');

              // add to google sheet
              const { _id, user, ...requ } = updateSta._doc;
              delete requ['__v'];
              Object.keys(requ).forEach((k) => {
                if (requ[k] instanceof Date) {
                  requ[k] = moment(requ[k]).format('LL');
                }
              });
              const valueAddToSheet = {
                id: _id.toString(),
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                ...requ,
              };
              const convertUpperCaseHeader = Object.entries(valueAddToSheet).reduce(
                (a, [key, value]) => {
                  a[key.charAt(0).toUpperCase() + key.slice(1)] = value;
                  return a;
                },
                {},
              );
              const header = Object.keys(convertUpperCaseHeader).map((key) => key);

              await addRows([{ ...convertUpperCaseHeader }], header);
            }
            // noti
            const mainChannels = await getMainChannels(MAIN_CHANNELS);
            const notis = [...mainChannels, updateSta._doc.user.slackId];

            await pushMessage(notis, formatStringNotiRequest(updateSta));
          }
          return t.populate('user request', '-password');
        });
      }
      const history = new historyModel({
        request: req.params.id,
        approved_request: {
          ...savedApprove._doc,
          userName: `${savedApprove._doc.user.firstName} ${savedApprove._doc.user.lastName}`,
        },
        action: type_approve,
      });
      history.save();
      res.status(200).json({
        message: 'The approve was successfully!',
        data: { ...savedApprove._doc },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async revertRequest(req, res) {
    try {
      const { reason } = req.body;
      const request = await RequestModel.findOne({ _id: req.params.id }).populate(
        'user',
        '-password',
      );

      // noti
      const mainChannels = await getMainChannels(MAIN_CHANNELS);
      const notis = [...mainChannels, request._doc.user.slackId];

      if (
        request.status !== STATUS_REQUEST[0] ||
        moment(request.from).format('L') < moment().format('L')
      ) {
        await pushMessage(notis, `${formatStringNotiRequest(request)} \n content: Revert fail!`);
        return res.status(400).json({ message: 'The request was rejected' });
      }
      if (req.usr._id !== request.user._id.toString())
        return res.status(400).json({ message: 'The request is not yours' });

      const revertStatus = await RequestModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: STATUS_REQUEST[2] } },
        { new: true },
      ).populate('user', '-password');
      await approveModel.deleteMany({ request: req.params.id });
      await pushMessage(
        notis,
        `${formatStringNotiRequest(revertStatus)} \n reasonRevert: ${reason}`,
      );
      const history = new historyModel({
        request: req.params.id,
        reverted_request: {
          ...revertStatus._doc,
          reason,
          userName: `${revertStatus._doc.user.firstName} ${revertStatus._doc.user.lastName}`,
        },
        action: 'Reverted',
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
  async getApprovesOfRequest(req, res) {
    try {
      const approvesOfRequest = await approveModel.find({ request: req.params.id });
      const request = await RequestModel.findOne({ _id: req.params.id });
      let mastersL = [];
      const groups = await groupModel.find();

      groups
        .filter((v) => v.masters.includes(request.user) || v.members.includes(request.user))
        .flatMap((v) => v.masters)
        .forEach((e) => {
          if (!mastersL.includes(e.toString())) {
            mastersL.push(e.toString());
          }
        });

      res.status(200).json({
        message: 'Get approves of the request successfully!',
        data: { approve: [...approvesOfRequest], verifier: mastersL.length },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getHistories(req, res) {
    try {
      const requestHistories = await historyModel
        .find({ request: req.params.id })
        .sort({ created_at: 1 });

      res.status(200).json({
        message: 'Get histories of the request successfully!',
        data: [...requestHistories],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RequestController();
