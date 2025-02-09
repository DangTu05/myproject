const Role = require("../../../models/roles/role.models");
const Accounts = require("../../../models/accounts/account.model");
class RoleController {
  /// show giao diện tạo role
  async show(req, res) {
    try {
      res.render("admin/pages/roles/create");
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// end show giao diện tạo role

  /// xử lý tạo role
  async create(req, res) {
    if (!res.locals.role.permissions.includes("role_create")) {
      return res.json({ message: "Bạn không có quyền tạo nhóm quyền" });
    } else {
      req.body.createdBy = res.locals.user._id;
      const role = new Role(req.body);
      try {
        await role.save();
        return res.status(200).json({ message: "Tạo thành công!" });
      } catch {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// end xử lý tạo role

  /// show danh sách nhóm quyền
  async permissions(req, res) {
    let find = {
      deleted: false,
    };
    const count = await Role.countDocuments({ deleted: false });
    const roles = await Role.find(find);
    const accounts = await Accounts.find({ deleted: false, status: "active" });
    try {
      res.render("admin/pages/roles/permissions", {
        roles: roles,
        count: count,
        accounts: accounts,
      });
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// end show danh sách nhóm quyền

  /// show danh sách role
  async roles(req, res) {
    let find = {
      deleted: false,
    };
    const roles = await Role.find(find);
    const count = await Role.countDocuments({ deleted: false });
    try {
      res.render("admin/pages/roles/role", { roles: roles, count: count });
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// end show danh sách role

  /// Xử lý xóa role
  async delete(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("role_delete")) {
      return res.json({ message: "Bạn không có quyền xóa nhóm quyền" });
    } else {
      const id = req.body._id;
      const deletedBy = res.locals.user._id;
      try {
        await Role.updateOne({ _id: id }, { deletedBy: deletedBy });
        await Role.delete({ _id: id });
        return res.status(200).json({ message: "Xóa thành công" });
      } catch {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End xử lý xóa role

  /// Show giao diện edit
  async showEdit(req, res) {
    const role = await Role.findOne({ _id: req.params.id });
    try {
      res.render("admin/pages/roles/edit", {
        role: role,
      });
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// End show giao diện edit

  /// Xử lý edit nhóm quyền
  async edit(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("role_edit")) {
      return res.json({ message: "Bạn không có quyền sửa nhóm quyền" });
    } else {
      const id = req.params.id;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      const { title, description } = req.body;
      try {
        await Role.updateOne(
          { _id: id },
          { title: title, description: description }
        );
        await Role.updatedOne({ _id: id }, { $push: { updatedBy: updated } });
        return res.status(200).json({ message: "Cập nhật thành công" });
      } catch {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End xử lý nhóm quyền

  /// Cập nhật quyền
  async updatePermissions(req, res) {
    const role = res.locals.role;
    if (role.permissions.includes("role_premission")) {
      return res.json({ message: "Bạn không có quyền cập nhật quyền" });
    } else {
      const permissions = req.body.permissions;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        for (const item of permissions) {
          await Role.updateOne(
            { _id: item._id },
            { permissions: item.permissions }
          );
          await Role.updateOne(
            { _id: item._id },
            { $push: { updatedBy: updated } }
          );
        }
        res.status(200).json({ message: "Cập nhật thành công" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End cập nhật quyền
}
module.exports = new RoleController();
