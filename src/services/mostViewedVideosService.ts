
import puppeteer, { Browser, Page } from "puppeteer";
import axios from "axios";
const ytGamingArabic = `https://www.youtube.com/feed/trending?bp=4gIcGhpnYW1pbmdfY29ycHVzX21vc3RfcG9wdWxhcg%3D%3D`
const ytMusicArabic = `https://www.youtube.com/feed/trending?bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D`
const ytJpMovies = `https://www.youtube.com/feed/trending?bp=4gIKGgh0cmFpbGVycw%3D%3D`

type videoType = {
    title: string,
    channleName: string,
    views: string,
    videoLink: string,
    channleLink: string,

}
export async function getMostViewedVideos(topic: string) {
    const ytThisWeekMostViews = `https://www.youtube.com/results?search_query=${topic}&sp=CAMSAggD`
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ]
        , executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),

        headless: true,
    })
    try {

        const page = await browser.newPage()
        await page.goto(ytThisWeekMostViews, {
            waitUntil: "networkidle2",
        })


        // we are like in the client side with evaluate
        const videos: videoType[] = await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll("ytd-video-renderer[bigger-thumbs-style='DEFAULT']"))
            const data = all.map((ele) => {

                const title = ele!.querySelector("#video-title")?.getAttribute("title")
                const videoLink = ele!.querySelector("a#thumbnail")?.getAttribute("href")
                const channleName = ele!.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.textContent
                const channleLink = ele!.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.getAttribute("href")
                const views = ele!.querySelector(".inline-metadata-item.style-scope.ytd-video-meta-block")?.textContent
                if (!title || !channleName || !views || !videoLink || !channleLink) {
                    throw new Error()
                }
                return { title, channleName, views, videoLink, channleLink }

            })


            return data
        })
        await browser.close()
        if (videos.length == 0 || !videos) {
            throw new Error()
        }
        return videos

    } finally {
        await browser.close()
    }
}
