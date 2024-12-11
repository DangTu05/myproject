class SiteController {
  show(req, res, next) {
    res.render("./admin/pages/index");
  }
}
module.exports = new SiteController;
