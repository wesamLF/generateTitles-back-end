"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostViewedVideos = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const ytGamingArabic = `https://www.youtube.com/feed/trending?bp=4gIcGhpnYW1pbmdfY29ycHVzX21vc3RfcG9wdWxhcg%3D%3D`;
const ytMusicArabic = `https://www.youtube.com/feed/trending?bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D`;
const ytJpMovies = `https://www.youtube.com/feed/trending?bp=4gIKGgh0cmFpbGVycw%3D%3D`;
async function getMostViewedVideos(topic) {
    const ytThisWeekMostViews = `https://www.youtube.com/results?search_query=${topic}&sp=CAMSAggD`;
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
        await page.goto(ytThisWeekMostViews, {
            waitUntil: "networkidle2",
        });
        // we are like in the client side with evaluate
        const videos = await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll("ytd-video-renderer[bigger-thumbs-style='DEFAULT']"));
            const data = all.map((ele) => {
                const title = ele.querySelector("#video-title")?.getAttribute("title");
                const videoLink = ele.querySelector("a#thumbnail")?.getAttribute("href");
                const channleName = ele.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.textContent;
                const channleLink = ele.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.getAttribute("href");
                const views = ele.querySelector(".inline-metadata-item.style-scope.ytd-video-meta-block")?.textContent;
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
exports.getMostViewedVideos = getMostViewedVideos;
