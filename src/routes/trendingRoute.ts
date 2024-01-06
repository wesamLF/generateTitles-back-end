import express from "express"
const router = express.Router();
import { trendingVideosController, trendingGenresController } from "../controllers/trendingController";

router.get('/:genre', trendingVideosController);
router.get('/:genre/genres', trendingGenresController); // return top 5 gnere and the trning videos






export default router;