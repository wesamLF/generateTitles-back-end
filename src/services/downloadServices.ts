



type trendingDataType = {
    title: string;
    channleName: string;
    views: string;
    videoLink: string;
    channleLink: string;
}[]
export const validJSON = (data: trendingDataType) => {

    if (data.length === 0 || !data) throw new Error()
    return data
}