const moment = require('moment');

const formatStringNotiRequest = (obj) => {
  return ` Name: ${obj._doc.user.firstName} ${obj._doc.user.lastName} 
    \n Email: ${obj._doc.user.email}  \n From: ${moment(obj._doc.from).format('L')} \n To: ${moment(
    obj._doc.to,
  ).format('L')} \n Time: ${obj._doc.time} \n Reason: ${obj._doc.reason} \n Type: ${
    obj._doc.type_of_work
  } \n Status: ${obj._doc.status} `;
};

module.exports = { formatStringNotiRequest };
