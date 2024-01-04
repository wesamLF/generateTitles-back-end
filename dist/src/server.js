"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser"
const bodyParser = require('body-parser');
const trendingRoute_1 = __importDefault(require("./routes/trendingRoute"));
const generateTitlesRoute_1 = __importDefault(require("./routes/generateTitlesRoute"));
const downloadFilesRoute_1 = __importDefault(require("./routes/downloadFilesRoute"));
const cors = require("cors");
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
const port = 5000;
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 30000, // half a minute
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
const downlaodlimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 3000, // 3 sec
    limit: 1,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);
app.get("/home", (req, res, next) => {
    res.send("running");
});
app.use("/trending", trendingRoute_1.default);
app.use("/generate", generateTitlesRoute_1.default);
app.use("/download", downloadFilesRoute_1.default);
app.use((err, req, res, next) => {
    res.status(503).json({ error: "Sorry something went wrong. Please try again.--" + err });
});
app.listen(port, () => { console.log("server is online", port); });
