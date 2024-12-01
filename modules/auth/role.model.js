const mongoose = require("mongoose");

// Define the schema for Role
const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Name of the role
    description: { type: String }, // Description of the role
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // List of permissions for the role
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
