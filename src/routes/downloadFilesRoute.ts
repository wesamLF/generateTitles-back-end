import express from "express"
const router = express.Router();
import {downloadFileCsv} from '../controllers/downloadFilesController'
router.post('/csv', downloadFileCsv); // generate base on the most viewd video










export default router;