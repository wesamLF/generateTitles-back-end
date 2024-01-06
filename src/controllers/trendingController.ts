
import { Request, Response, NextFunction } from "express"

import { getBestGenres } from "../services/trendingServices"
import { trendingMockupData, urlTpyes } from "../local-storage/trendingMockup/trendingMockupData.handler"

type generateGenreType = {
    genre: string
    description: string
}


export async function trendingVideosController(req: Request, res: Response, next: NextFunction) {
    try {

        const data = trendingMockupData(req.params?.genre as urlTpyes)
        if (!data) throw new Error("invalid genre! try: gaming | movies | now | music")

        const fullData = {
            trending: data,
        }
        res.status(200)
        res.json(fullData)
    } catch (err) {
        next(err)
    }

}
export async function trendingGenresController(req: Request, res: Response, next: NextFunction) {
    try {
        let titles: (string | null)[]
        const data = trendingMockupData(req.params?.genre as urlTpyes)
        if (!data) throw new Error("invalid genre! try: gaming | movies | now | music")


        titles = data.trending.map((title) => title!.title)


        const generatedGenres: generateGenreType[] = await getBestGenres(titles as string[])
        const fullData = {
            trending: data,
            genres: generatedGenres
        }
        res.json(fullData)
    } catch (err) {
        next(err)
    }

}