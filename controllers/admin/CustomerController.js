const Customers = require("../../models/users/user.model");
class CustomerController {
  /// show danh sách tài khoản customer
  async show(req, res) {
    const customers = await Customers.find({
      deleted: false,
    }).select(" -password");
    res.render("./admin/pages/accounts/ListCustomer", {
      clients: customers,
    });
  }
  /// end show

  /// Thay đổi trạng thái
  async changeStatus(req, res) {
    try {
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      await Customers.updateOne(
        {
          _id: req.params.id,
        },
        {
          status: req.params.status,
        }
      );
      await Customers.updateOne(
        {
          _id: req.params.id,
        },
        {
          $push: { updatedBy: updated },
        }
      );
      res.status(200).json({ message: "Cập nhật thành công" });
      return;
    } catch {
      res.status(400).json({ message: "Đã xảy ra lỗi" });
      return;
    }
  }
  /// End thay đổi trạng thái

  /// Xóa tài khoản
  async delete(req, res) {
    // const role = res.locals.user.role;
    try {
      await Customers.delete({ _id: req.params.id });
      await Customers.updateOne(
        { _id: req.params.id },
        { deletedBy: res.locals.user._id }
      );
      res.status(200).json({ message: "Xóa thành công" });
    } catch {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End xóa tài khoản

  /// Thông tin chi tiết user
  async showDetail(req, res) {
    const info_customer = await Customers.findOne({
      _id: req.params.id,
    }).select("-password");
    console.log(info_customer);

    res.status(200).json({
      info_customer: info_customer,
    });
    return;
  }
  /// End thông tin chin= tiết
}
module.exports = new CustomerController();
