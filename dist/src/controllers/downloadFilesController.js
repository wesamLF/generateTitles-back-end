"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileCsv = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv = __importStar(require("fast-csv"));
const uuidv4_1 = require("uuidv4");
const publicPath_1 = require("../../public/publicPath");
const downloadServices_1 = require("../services/downloadServices");
const downloadFileCsv = async (req, res, next) => {
    try {
        const fileName = (0, uuidv4_1.uuid)();
        const data = (0, downloadServices_1.validJSON)(req.body.data.trending);
        const fileFullPath = path.join((0, publicPath_1.getPublicFilePath)(), `${fileName}.csv`);
        const ws = fs.createWriteStream(fileFullPath);
        const csvFile = csv.write(data, { headers: true }).pipe(ws).on("finish", async () => {
            res.download(fileFullPath, (err) => {
                if (err) {
                    console.log("in dow");
                    console.log(err);
                    next(err);
                }
                fs.unlink(fileFullPath, (err) => {
                    if (err) {
                        // send an email to admin 
                    }
                });
            });
        });
    }
    catch (err) {
        next(err);
    }
};
exports.downloadFileCsv = downloadFileCsv;
