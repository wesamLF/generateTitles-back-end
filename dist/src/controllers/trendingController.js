"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trendingGenresController = exports.trendingVideosController = void 0;
const trendingServices_1 = require("../services/trendingServices");
const urlsFilter_1 = require("../util/urlsFilter");
async function trendingVideosController(req, res, next) {
    try {
        const url = (0, urlsFilter_1.urlsFilter)(req.params?.genre); // by defualt genre == "trending now"
        const data = await (0, trendingServices_1.getTrendingVideosData)(url);
        const fullData = {
            trending: data,
        };
        res.status(200);
        res.json(fullData);
    }
    catch (err) {
        next(err);
    }
}
exports.trendingVideosController = trendingVideosController;
async function trendingGenresController(req, res, next) {
    try {
        const url = (0, urlsFilter_1.urlsFilter)(req.params?.genre);
        const temp = await (0, trendingServices_1.getTrendingVideosData)(url);
        let titles;
        if (temp) {
            titles = temp.map((title) => title.title);
        }
        else {
            titles = [""];
        }
        const generatedGenres = await (0, trendingServices_1.getBestGenres)(titles);
        const fullData = {
            trending: temp,
            genres: generatedGenres
        };
        res.json(fullData);
    }
    catch (err) {
        next(err);
    }
}
exports.trendingGenresController = trendingGenresController;
