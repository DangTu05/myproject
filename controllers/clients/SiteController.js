class SiteController {
  async show(req, res) {
    try {
      res.render("./clients/pages/home");
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new SiteController();
