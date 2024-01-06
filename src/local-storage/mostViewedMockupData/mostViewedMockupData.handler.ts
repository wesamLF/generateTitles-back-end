
import { fortniteMostviewedMockupData , csgoMostviewedMockupData , valorantMostviewedMockupData} from "./mostViewedVideosGaming.data"

import { rapMostviewedMockupData , rockAndRollMostviewedMockupData } from "./mostViewedVideosMusic.data"



type topicTpyes = "valorant" | "fortnite" | "csgo" | "rap" | "rockandroll"
 function mostViewedMockupData(topic: topicTpyes){
    switch (topic) {
        case "valorant": return valorantMostviewedMockupData
        case "fortnite": return fortniteMostviewedMockupData
        case "csgo": return csgoMostviewedMockupData
        case "rap": return rapMostviewedMockupData
        case "rockandroll": return rockAndRollMostviewedMockupData
        default: return null
    }
}
export {topicTpyes , mostViewedMockupData }