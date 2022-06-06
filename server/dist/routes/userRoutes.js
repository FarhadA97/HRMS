"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = (0, express_1.Router)();
router.post("/validate", auth_1.default, userController_1.validate);
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
exports.default = router;
