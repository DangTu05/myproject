const Time = require("../../../util/times/VnTime");
class MyAccout {
  async index(req, res) {
    let time = {};
    if (res.locals.user.updatedAt) {
      time.createdAt = Time(res.locals.user.createdAt);
    }
    if (res.locals.user.updatedAt) {
      time.updatedAt = Time(res.locals.user.updatedAt);
    }
    res.locals.user.time = time;
    res.render("admin/pages/my-account/index");
  }
}
module.exports = new MyAccout();
