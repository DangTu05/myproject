module.exports = {
  /// Chuyển đổi 1 mảng đối tượng về js thuần
  mutipleMongooseToObject: function (mongoose) {
    return mongoose.map((mongoose) => mongoose.toObject());
  },
  /// Chuyển đổi 1 đối tượng về js thuần
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
