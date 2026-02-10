const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:moongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function () {
    dbgr("connected");
  })
  .catch(function (err) {
    dbgr(err);
  });
  
module.exports = mongoose.connection;
