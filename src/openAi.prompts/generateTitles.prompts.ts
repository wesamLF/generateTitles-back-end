import { ChatCompletionMessageParam } from "openai/resources/index.mjs";



export function titlesFromTrendingPrompt(titles: string[]): ChatCompletionMessageParam[] {
    return [
        { role: 'user', content: 'i am gonna give you a list of the trending YouTube videos, and i want you to analyze it and answer me only based on the given list' },
        { role: 'assistant', content: 'Sure, please provide the list and I will analyze it based on the given information.' },
        { role: 'user', content: JSON.stringify(titles) },
        {
            role: 'user', content: `for each item in the giving list generate similar title, the response is a JSON object containing the generated titles and the original titles 
        make sure the format is {titles:[{originalTitle: "old title",generatedTitle: "new title"},{originalTitle: "old title",generatedTitle: "new title"}]}
        ` }
    ]
}


export function titlesFromAiPrompt(tobic: string): ChatCompletionMessageParam[] {
    return [
        { role: 'user', content: 'i am create new youtube video and i want you to hlep me create some catchy titles' },
        { role: 'assistant', content: 'Absolutely! What iss the topic or theme of your YouTube video? With a bit more info, I can tailor some catchy titles for you.'},
        {
            role: 'user', content: `the topic is ${tobic}, i want you to give me 10 titles with a brief description for each title. in a JSON object please make sure the format is always as [{title: "",description: ""},{title: "",description: ""}]` }
    ]
}

// role: 'user', content: `the topic is csgo and the theme is gaming, i want you to give me 10 titles with a brief description for each title. in a JSON object please make sure the format is always as [{title: "",description: ""},{title: "",description: ""}]` }
