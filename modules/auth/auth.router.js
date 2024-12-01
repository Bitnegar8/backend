const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller"); // وارد کردن کلاس به درستی

const authController = new AuthController(); // ساخت شیء از کلاس

// اطمینان حاصل کنید که این متدها وجود دارند
router.post("/register", authController.register);

module.exports = router;
