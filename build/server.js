"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authUserRoute_1 = __importDefault(require("./routes/authUserRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const connectToDb_1 = require("./config/connectToDb");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
require("./config/passportConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, connectToDb_1.connectToDB)();
app.use(passport_1.default.initialize());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api-user', authUserRoute_1.default, userRoute_1.default);
app.listen(PORT, () => {
    console.log(`[server]: running on port ${PORT}`);
});
