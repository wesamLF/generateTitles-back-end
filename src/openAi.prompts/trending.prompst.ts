import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export function treningGeneresPrompt(titles: string[]): ChatCompletionMessageParam[] {
    return [
        { role: 'user', content: 'i am gonna give you a list of the trending YouTube videos, and i want you to analyze it and answer me only based on the given list' },
        { role: 'assistant', content: 'Sure, please provide the list and I will analyze it based on the given information.' },
        { role: 'user', content: JSON.stringify(titles) },
        {
            role: 'user', content: `i want you analyze the list and then give me the best 5 different genres with a brief description each genre is in JSON object 
            make sure the format is always as topGenreByVideo: [{genre: "",description: ""},{genre: "",description: ""}]` }
    ]
}