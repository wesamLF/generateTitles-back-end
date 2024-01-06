

import {gamingMockupTrendingData , musicMockupTrendingData, moviesMockupTrendingData, nowMockupTrendingData} from "./trending.data"




type urlTpyes = "gaming" | "movies" | "now" | "music"
 function trendingMockupData(genre: urlTpyes){
    switch (genre) {
        case "gaming": return gamingMockupTrendingData
        case "movies": return moviesMockupTrendingData
        case "now": return nowMockupTrendingData
        case "music": return musicMockupTrendingData
        default: return null
    }
}
export {urlTpyes , trendingMockupData }