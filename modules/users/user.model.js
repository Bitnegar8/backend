const mongoose = require("mongoose");

// Define Schema for contact fields (Email, Mobile, Phone)
const ContactFieldSchema = new mongoose.Schema(
  {
    value: { type: String, required: true }, // Email, Mobile, or Phone value
    verified: { type: Boolean, default: false }, // Verification status
    primary: { type: Boolean, default: false }, // Primary status
    verificationCode: { type: String }, // Verification code
    verificationCodeExpiry: { type: Date }, // Verification code expiry date
  },
  { _id: false }
);

// Define Schema for address
const AddressSchema = new mongoose.Schema(
  {
    address: { type: String, required: false }, // Address
    city: { type: String, required: false }, // City
    state: { type: String, required: false }, // State/Province
    country: { type: String, required: false }, // Country
    postalCode: { type: String, required: false }, // Postal code
    verified: { type: Boolean, default: false }, // Verification status
    coordinates: {
      // Geographical coordinates
      latitude: { type: Number, required: false }, // Latitude
      longitude: { type: Number, required: false }, // Longitude
    },
  },
  { _id: false }
);

// Define Schema for user
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    fatherName: { type: String, required: false },
    userId: { type: String, required: false, unique: false },
    emiratesID: { type: String, required: false, unique: false },
    dateOfBirth: { type: String }, // تاریخ تولد
    nationality: { type: String }, // ملیت
    emails: [ContactFieldSchema], // Emails
    mobiles: [ContactFieldSchema], // Mobile numbers
    phones: [ContactFieldSchema], // Phone numbers
    addresses: [AddressSchema], // Addresses
    password: { type: String, required: false },
    accessToken: { type: String },
    refreshToken: { type: String },
    preferredLanguage: {
      type: String,
      enum: ["en", "fa", "ar", "fr"],
      default: "en",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    }, // جنسیت
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }], // ارجاع به مدل Role
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }], // فیلد جدید برای ارجاع به کمپانی‌ها
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
