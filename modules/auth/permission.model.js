const mongoose = require("mongoose");

// Define the schema for Permission
const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Name of the permission
    description: { type: String }, // Description of the permission
  },
  { timestamps: true }
);

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = Permission;
