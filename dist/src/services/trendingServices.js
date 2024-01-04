"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestGenres = exports.getTrendingVideosData = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const openai_1 = __importDefault(require("openai"));
const trending_prompst_1 = require("../util/trending.prompst");
async function getTrendingVideosData(url) {
    const browser = await puppeteer_1.default.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer_1.default.executablePath(),
        headless: true,
    });
    try {
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: "networkidle2",
        });
        const videos = await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll("ytd-video-renderer[bigger-thumbs-style='DEFAULT']"));
            const data = all.map((ele) => {
                const title = ele?.querySelector("#video-title")?.getAttribute("title");
                const videoLink = ele?.querySelector("a#thumbnail")?.getAttribute("href");
                const channleName = ele?.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.textContent;
                const channleLink = ele?.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.getAttribute("href");
                const views = ele?.querySelector(".inline-metadata-item.style-scope.ytd-video-meta-block")?.textContent;
                if (!title || !channleName || !views || !videoLink || !channleLink) {
                    throw new Error();
                }
                return { title, channleName, views, videoLink, channleLink };
            });
            return data;
        });
        await browser.close();
        if (videos.length == 0 || !videos) {
            throw new Error();
        }
        return videos;
    }
    finally {
        await browser.close();
    }
}
exports.getTrendingVideosData = getTrendingVideosData;
async function getBestGenres(trendingTitles) {
    const openai = new openai_1.default({ apiKey: process.env.OPENAI_KEY });
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: (0, trending_prompst_1.treningGeneresPrompt)(trendingTitles),
        response_format: {
            type: "json_object"
        }
    });
    const generatedGenresArray = await JSON.parse(stream.choices[0].message.content);
    if (!generatedGenresArray?.topGenreByVideo) {
        throw new Error("generatedGenresArray?.topGenreByVideo not found!");
    }
    return generatedGenresArray?.topGenreByVideo;
}
exports.getBestGenres = getBestGenres;
