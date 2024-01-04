import { Request, Response, NextFunction } from "express"
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { uuid } from 'uuidv4';
import { getPublicFilePath } from "../../public/publicPath";
import { validJSON } from "../services/downloadServices";



type trendingDataType = {
    title: string;
    channleName: string;
    views: string;
    videoLink: string;
    channleLink: string;
}[]

export const downloadFileCsv = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileName = uuid();
        const data:trendingDataType = validJSON(req.body.data.trending)
        const fileFullPath = path.join(getPublicFilePath(), `${fileName}.csv`)
        const ws = fs.createWriteStream(fileFullPath)
        const csvFile = csv.write(data, { headers: true }).pipe(ws).on("finish", async () => {
            res.download(fileFullPath, (err) => {
                if (err) {
                    console.log("in dow")
                    console.log(err)
                    next(err)
                }
                fs.unlink(fileFullPath, (err) => {
                    if (err) {
                        // send an email to admin 
                    }
                })
            })
        })


    } catch (err) {
        next(err)
    }

}

