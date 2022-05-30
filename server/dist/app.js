"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./config");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/user", userRoutes_1.default);
mongoose_1.default
    .connect(config_1.DB)
    .then(function () {
    console.log("Connected to db");
    app.listen(config_1.PORT, function () {
        console.log("Listening On PORT ".concat(config_1.PORT));
    });
})
    .catch(function (error) {
    console.log("".concat(error, " did not connect"));
});
