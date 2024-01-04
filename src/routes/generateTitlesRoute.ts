import express from "express"
const router = express.Router();
import {generateTitlesFromMostViewed , generateTitlesFromAI} from "../controllers/generateTitlesController"

router.get('/titles/mostViewed/:tobic', generateTitlesFromMostViewed); // generate base on the most viewd video
router.get('/titles/ai/:tobic', generateTitlesFromAI); // generate base on the trending










export default router;