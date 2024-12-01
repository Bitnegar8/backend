const Role = require("./../modules/auth/role.model"); // آدرس فایل مدل نقش‌ها
const Permission = require("./../modules/auth/permission.model"); // آدرس فایل مدل مجوزها

const permissionsData = [
  { name: "read", description: "Read access" },
  { name: "write", description: "Write access" },
  { name: "delete", description: "Delete access" },
];

const rolesData = [
  { name: "admin", description: "Administrator with full access" },
  { name: "user", description: "Regular user with limited access" },
  {
    name: "real estate admin",
    description: "Admin for real estate management",
  },
  {
    name: "real estate broker",
    description: "Broker for real estate dealings",
  },
];

async function initializeRolesAndPermissions() {
  try {
    // اضافه کردن مجوزها
    for (const permission of permissionsData) {
      const existingPermission = await Permission.findOne({
        name: permission.name,
      });
      if (!existingPermission) {
        await Permission.create(permission);
        console.log(`Permission ${permission.name} created.`);
      }
    }

    // دریافت تمامی مجوزها
    const allPermissions = await Permission.find();

    // اضافه کردن نقش‌ها
    for (const role of rolesData) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        // دریافت آیدی‌های تمامی مجوزها
        const permissionsForRole = allPermissions.map((perm) => perm._id);

        // ایجاد نقش جدید
        await Role.create({ ...role, permissions: permissionsForRole });
        console.log(`Role ${role.name} created with permissions.`);
      }
    }

    console.log("Roles and permissions initialized successfully.");
  } catch (error) {
    console.error("Error initializing roles and permissions:", error);
  }
}

module.exports = initializeRolesAndPermissions;
