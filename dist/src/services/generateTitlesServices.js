"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeneratedTitlesFromAI = exports.getGeneratedTitlesFromMostViewed = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const openai_1 = __importDefault(require("openai"));
const generateTitles_prompts_1 = require("../util/generateTitles.prompts");
async function getGeneratedTitlesFromMostViewed(trendingTitles) {
    const openai = new openai_1.default({ apiKey: process.env.OPENAI_KEY });
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: (0, generateTitles_prompts_1.titlesFromTrendingPrompt)(trendingTitles),
        response_format: {
            type: "json_object"
        }
    });
    const generateTitlesArray = await JSON.parse(stream.choices[0].message.content);
    if (!generateTitlesArray?.titles) {
        throw new Error("no titles found 23, gTservices");
    }
    return generateTitlesArray.titles;
}
exports.getGeneratedTitlesFromMostViewed = getGeneratedTitlesFromMostViewed;
async function getGeneratedTitlesFromAI(tobic) {
    const openai = new openai_1.default({ apiKey: process.env.OPENAI_KEY });
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: (0, generateTitles_prompts_1.titlesFromAiPrompt)(tobic),
        response_format: {
            type: "json_object"
        }
    });
    const generatedGenresArray = await JSON.parse(stream.choices[0].message.content);
    if (!generatedGenresArray?.titles) {
        throw new Error("no titles found 43, gTservices");
    }
    return generatedGenresArray.titles;
}
exports.getGeneratedTitlesFromAI = getGeneratedTitlesFromAI;
