
import { Request, Response, NextFunction } from "express"
import { getGeneratedTitlesFromAI, getGeneratedTitlesFromMostViewed } from "../services/generateTitlesServices"
import { getMostViewedVideos } from "../services/mostViewedVideosService"

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
        //req.body.Input-> the base title 
        // const trndingTitles = await getTitles()
        const temp = await getMostViewedVideos(req.params?.tobic || "gaming")
        let titles: (string | null)[]
        if (temp) {
            titles = temp.map((title) => title!.title)
        } else { titles = [""] }
        const generatedTitles:generateTitlesMVType[] = await getGeneratedTitlesFromMostViewed(titles as string[])
        const fullData = temp?.map((video, i) => {
            const temp = generatedTitles.filter((genTi)=> video?.title == genTi?.originalTitle)
            return{...video , generatedTitle: temp[0].generatedTitle}
        })
        res.status(200)
        res.json(fullData)
    } catch (err) {
        next(err)
    }

}



export async function generateTitlesFromAI(req: Request, res: Response, next: NextFunction) {
    try {
      
        const generatedTitles:generateTitlesAIType[] = await getGeneratedTitlesFromAI(req.params?.tobic || "gaming") 
        
        res.json(generatedTitles)
    } catch (err) {
        next(err)
    }

}