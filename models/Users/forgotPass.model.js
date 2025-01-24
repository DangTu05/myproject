const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ForgotPassword = new Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 3),
    },
  },
  {
    timestamps: true,
  }
);
// TTL Index
ForgotPassword.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model(
  "ForgotPassword",
  ForgotPassword,
  "forgot_passwords"
);
