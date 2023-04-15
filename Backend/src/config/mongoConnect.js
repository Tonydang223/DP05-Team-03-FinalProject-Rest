const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DBNAME,
    });
    console.log('connect mongoDB ok!');
  } catch (error) {
    console.log('connect fail', error.message);
  }
}
module.exports = { connect };
