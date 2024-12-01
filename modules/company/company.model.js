const mongoose = require("mongoose");

// تعریف اسکیما برای کمپانی
const companySchema = new mongoose.Schema({
  businessField: {
    type: String,
    required: true,
    enum: ["Real Estate", "Developer"], // می‌توان فیلدهای بیشتر برای نوع کسب‌وکار تعریف کرد
    trim: true,
  },
  companySize: {
    type: String,
    required: true,
    enum: ["Small", "Medium", "Large"], // اندازه‌های مختلف شرکت
    trim: true,
  },
  currentLocation: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    // فیلد برای مالک اصلی کمپانی
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ارجاع به مدل User
    required: true,
  },
  partners: [
    {
      // فیلد جدید برای شرکا
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ارجاع به مدل User برای شرکا
    },
  ],
});

// ایجاد مدل از اسکیما
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
