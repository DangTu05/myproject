const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // "mongodb://127.0.0.1:27017/Prj_Products"
    console.log("connect sucessfully!!!");
  } catch (error) {
    console.log("connect failue!!!");
  }
}
module.exports = { connect };