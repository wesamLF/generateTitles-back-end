
import { config } from "dotenv"
config()
import OpenAI from "openai"
import { treningGeneresPrompt } from "../openAi.prompts/trending.prompst";




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