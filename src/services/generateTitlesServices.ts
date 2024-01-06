
import { config } from "dotenv"
config()
import OpenAI from "openai"
import { titlesFromTrendingPrompt, titlesFromAiPrompt } from "../openAi.prompts/generateTitles.prompts";



export async function getGeneratedTitlesFromMostViewed(mostViewedvideos: string[]) {

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: titlesFromTrendingPrompt(mostViewedvideos),
        response_format: {
            type: "json_object"
        }


    });
    const generateTitlesArray = await JSON.parse(stream.choices[0].message.content as string)

    if (!generateTitlesArray?.titles) {
        throw new Error("no titles found 23, gTservices")
    }
    return generateTitlesArray.titles


}
export async function getGeneratedTitlesFromAI(topic: string) {
   
        const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
        const stream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: titlesFromAiPrompt(topic),
            response_format: {
                type: "json_object"
            }


        });
        const generatedGenresArray = await JSON.parse(stream.choices[0].message.content as string)
        if (!generatedGenresArray?.titles) {
            throw new Error("no titles found 43, gTservices")
        }
        return generatedGenresArray.titles
    

}

