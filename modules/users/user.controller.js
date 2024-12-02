const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("./user.model"); // مدل کاربر
const Company = require("./../company/company.model");
const MainController = require("./../../main/main.controller"); // ارث‌بری از MainController

class UserController extends MainController {
  // متد ثبت شرکت برای کاربر
  createCompany = async (req, res) => {
    try {
      const { name, businessField, companySize, currentLocation, partners } =
        req.body;

      // اعتبارسنجی ورودی‌ها
      if (!name || !businessField || !companySize || !currentLocation) {
        return this.sendResponse(
          res,
          false,
          null,
          "All fields are required",
          400
        );
      }

      console.log("ooooooooo" + JSON.stringify(req.user));

      // ساخت شرکت جدید
      const newCompany = new Company({
        name,
        businessField,
        companySize,
        currentLocation,
        owner: req.user.userId, // کاربری که شرکت را ایجاد کرده است
        partners: partners || [], // شرکا (اختیاری)
      });

      // ذخیره شرکت در پایگاه داده
      const savedCompany = await newCompany.save();
      console.log("savedCompany" + JSON.stringify(req.user.userId));

      const user = await User.findOne({ _id: req.user.userId });
      await user.companies.push(savedCompany._id);
      await user.save();
      // افزودن شناسه شرکت به لیست شرکت‌های کاربر
      // req.user.companies.push(savedCompany._id);
      // await req.user.save();

      // پاسخ موفقیت‌آمیز
      const data = {
        message: "Company registered successfully",
        company: savedCompany,
      };
      return this.sendResponse(res, true, data);
    } catch (error) {
      return this.sendResponse(
        res,
        false,
        null,
        "Internal Server Error" + error,
        500
      );
    }
  };
}

module.exports = new UserController();
