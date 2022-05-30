"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = (0, express_1.Router)();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
exports.default = router;
