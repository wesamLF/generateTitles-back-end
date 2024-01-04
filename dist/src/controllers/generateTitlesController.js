"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTitlesFromAI = exports.generateTitlesFromMostViewed = void 0;
const generateTitlesServices_1 = require("../services/generateTitlesServices");
const mostViewedVideosService_1 = require("../services/mostViewedVideosService");
async function generateTitlesFromMostViewed(req, res, next) {
    try {
        //req.body.Input-> the base title 
        // const trndingTitles = await getTitles()
        const temp = await (0, mostViewedVideosService_1.getMostViewedVideos)(req.params?.tobic || "gaming");
        let titles;
        if (temp) {
            titles = temp.map((title) => title.title);
        }
        else {
            titles = [""];
        }
        const generatedTitles = await (0, generateTitlesServices_1.getGeneratedTitlesFromMostViewed)(titles);
        const fullData = temp?.map((video, i) => {
            const temp = generatedTitles.filter((genTi) => video?.title == genTi?.originalTitle);
            return { ...video, generatedTitle: temp[0].generatedTitle };
        });
        res.status(200);
        res.json(fullData);
    }
    catch (err) {
        next(err);
    }
}
exports.generateTitlesFromMostViewed = generateTitlesFromMostViewed;
async function generateTitlesFromAI(req, res, next) {
    try {
        const generatedTitles = await (0, generateTitlesServices_1.getGeneratedTitlesFromAI)(req.params?.tobic || "gaming");
        res.json(generatedTitles);
    }
    catch (err) {
        next(err);
    }
}
exports.generateTitlesFromAI = generateTitlesFromAI;
