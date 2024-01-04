import express, { Application, NextFunction, Request, Response } from "express"
// import bodyParser from "body-parser"
const bodyParser = require('body-parser');

import trendingRoute from "./routes/trendingRoute"
import generateTitlesRoute from "./routes/generateTitlesRoute"
import downloadFilesRoute from "./routes/downloadFilesRoute"

const cors = require("cors")
// import { rateLimit } from 'express-rate-limit'

const app: Application = express()
const port = 5000
// const limiter = rateLimit({
//     windowMs: 30000, // half a minute
//     limit: 5,
//     standardHeaders: 'draft-7',
//     legacyHeaders: false,
// })
// const downlaodlimiter = rateLimit({
//     windowMs: 3000, // 3 sec
//     limit: 1,
//     standardHeaders: 'draft-7',
//     legacyHeaders: false,
// })

app.use(bodyParser.json());
app.use(cors())
// app.use(limiter)
app.get("/home", (req, res, next) => {
    res.send("welcome")
})
app.use("/trending", trendingRoute)
app.use("/generate", generateTitlesRoute)
app.use("/download", downloadFilesRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(503).json({ error: err.message })
})

app.listen(port, (): void => { console.log("server is online", port) })

