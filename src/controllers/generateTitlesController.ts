
import { Request, Response, NextFunction } from "express"
import { getGeneratedTitlesFromAI, getGeneratedTitlesFromMostViewed } from "../services/generateTitlesServices"
import { mostViewedMockupData, topicTpyes } from "../local-storage/mostViewedMockupData/mostViewedMockupData.handler"

type generateTitlesMVType = {
    generatedTitle: string
    originalTitle: string
}
type generateTitlesAIType = {
    title: string
    description: string
}

export async function generateTitlesFromMostViewed(req: Request, res: Response, next: NextFunction) {

    try {
        let titles: (string | null)[]

        const data = mostViewedMockupData(req.params?.topic as topicTpyes)
        if (!data) throw new Error("invalid topic!")

        titles = data.map((title) => title!.title)
        const generatedTitles: generateTitlesMVType[] = await getGeneratedTitlesFromMostViewed(titles as string[])
        //regrouping the orginal mostviewed titles array and the generated titles
        const fullData = data?.map((video, i) => {
            const temp = generatedTitles.filter((genTi) => video?.title == genTi?.originalTitle)
            return { ...video, generatedTitle: temp[0].generatedTitle }
        })
        res.status(200)
        res.json(fullData)
    } catch (err) {
        next(err)
    }

}



export async function generateTitlesFromAI(req: Request, res: Response, next: NextFunction) {
    try {

        const generatedTitles: generateTitlesAIType[] = await getGeneratedTitlesFromAI(req.params?.topic as topicTpyes)

        res.json(generatedTitles)
    } catch (err) {
        next(err)
    }

}