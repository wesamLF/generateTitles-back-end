"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlsFilter = void 0;
const trenidngNOW = `https://www.youtube.com/feed/trending?gl=US&app=desktop`;
const trenidngGaming = `https://www.youtube.com/feed/trending?gl=US&bp=4gIcGhpnYW1pbmdfY29ycHVzX21vc3RfcG9wdWxhcg%3D%3D`;
const trenidngMovies = `https://www.youtube.com/feed/trending?gl=US&bp=4gIKGgh0cmFpbGVycw%3D%3D`;
const trenidngMusic = `https://www.youtube.com/feed/trending?gl=US&bp=4gINGgt5dG1hX2NoYXJ0cw%3D%3D`;
function urlsFilter(type) {
    switch (type) {
        case "gaming": return trenidngGaming;
        case "movies": return trenidngMovies;
        case "now": return trenidngNOW;
        case "music": return trenidngMusic;
        default: return trenidngNOW;
    }
}
exports.urlsFilter = urlsFilter;
