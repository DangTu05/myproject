const Role = require("../../../models/roles/role.models");
class RoleController {
  /// show giao diện tạo role
  async show(req, res, next) {
    try {
      res.render("admin/pages/roles/create");
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  }
  /// end show giao diện tạo role

  /// xử lý tạo role
  async create(req, res, next) {
    const role = new Role(req.body);
    try {
      await role.save().then(() => {
        return res.status(200).json({ message: "Tạo thành công!" });
      });
    } catch (error) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end xử lý tạo role

  /// show danh sách nhóm quyền
  async permissions(req, res, next) {
    let find = {
      deleted: false,
    };
    const count = await Role.countDocuments({ deleted: false });
    const roles = await Role.find(find);
    try {
      res.render("admin/pages/roles/permissions", {
        roles: roles,
        count: count,
      });
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// end show danh sách nhóm quyền

  /// show danh sách role
  async roles(req, res, next) {
    let find = {
      deleted: false,
    };
    const roles = await Role.find(find);
    const count = await Role.countDocuments({ deleted: false });
    try {
      res.render("admin/pages/roles/role", { roles: roles, count: count });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  }
  /// end show danh sách role

  /// Xử lý xóa role
  async delete(req, res, next) {
    const id = req.body._id;
    try {
      await Role.delete({ _id: id });
      return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End xử lý xóa role

  /// Cập nhật quyền
  async updatePermissions(req, res, next) {
    const permissions = req.body.permissions;
    try {
      for (const item of permissions) {
        await Role.updateOne(
          { _id: item._id },
          { permissions: item.permissions }
        );
      }
      res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End cập nhật quyền
}
module.exports = new RoleController();
