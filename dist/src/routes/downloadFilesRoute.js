"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const downloadFilesController_1 = require("../controllers/downloadFilesController");
router.post('/csv', downloadFilesController_1.downloadFileCsv); // generate base on the most viewd video
exports.default = router;
