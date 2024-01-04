"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const trendingController_1 = require("../controllers/trendingController");
router.get('/:genre', trendingController_1.trendingVideosController);
router.get('/:genre/genres', trendingController_1.trendingGenresController); // return top 5 gnere and the trning videos
//get(///) -> download pdf titles and channle links
exports.default = router;
