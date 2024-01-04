"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const generateTitlesController_1 = require("../controllers/generateTitlesController");
router.get('/titles/mostViewed/:tobic', generateTitlesController_1.generateTitlesFromMostViewed); // generate base on the most viewd video
router.get('/titles/ai/:tobic', generateTitlesController_1.generateTitlesFromAI); // generate base on the trending
exports.default = router;
