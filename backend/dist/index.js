"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI, {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
})
    .then(() => console.log("DB Connected..."))
    .catch((err) => console.log("Error while connecting to db: ", err));
app.use("/", routes_1.default);
app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: error.message,
    });
});
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
