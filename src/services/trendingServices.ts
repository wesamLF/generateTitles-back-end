
import puppeteer from "puppeteer";
import { config } from "dotenv"
config()
import OpenAI from "openai"
import { treningGeneresPrompt } from "../util/trending.prompst";



// const am = `https://www.nn-group.com/home.htm`
type videoType = {
    title: string,
    channleName: string,
    views: string,
    videoLink: string,
    channleLink: string,

}
export async function getTrendingVideosData(url: string) {

    const browser = await puppeteer.launch({
           headless: "new"
    })


    try {
        const page = await browser.newPage()
        await page.goto(url, {
            waitUntil: "networkidle2",
        })
        const videos: videoType[] = await page.evaluate(() => {
            const all = Array.from(document.querySelectorAll("ytd-video-renderer[bigger-thumbs-style='DEFAULT']"))
            const data = all.map((ele) => {
                const title = ele?.querySelector("#video-title")?.getAttribute("title")
                const videoLink = ele?.querySelector("a#thumbnail")?.getAttribute("href")
                const channleName = ele?.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.textContent
                const channleLink = ele?.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string")?.getAttribute("href")
                const views = ele?.querySelector(".inline-metadata-item.style-scope.ytd-video-meta-block")?.textContent
                if (!title || !channleName || !views || !videoLink || !channleLink) {
                    throw new Error("elelments")
                }
                return { title, channleName, views, videoLink, channleLink }
            })
            return data
        })
        await browser.close()
        if (videos.length == 0 || !videos) {
            throw new Error("empty")
        }
        return videos

    } finally {
        await browser.close()
    }
}


export async function getBestGenres(trendingTitles: string[]) {

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: treningGeneresPrompt(trendingTitles),
        response_format: {
            type: "json_object"
        }


    });
    const generatedGenresArray = await JSON.parse(stream.choices[0].message.content as string)

    if (!generatedGenresArray?.topGenreByVideo) {
        throw new Error("generatedGenresArray?.topGenreByVideo not found!")
    } return generatedGenresArray?.topGenreByVideo


}