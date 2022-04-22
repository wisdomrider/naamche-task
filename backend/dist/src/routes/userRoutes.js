"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validateUser_1 = require("../middlewares/validateUser");
const router = (0, express_1.Router)();
// swagger docs
router.post("/login", userController_1.userLogin);
router.post("/register", userController_1.userRegister);
router.get("/names/:search", validateUser_1.validateUser, userController_1.getUserNames);
exports.default = router;
