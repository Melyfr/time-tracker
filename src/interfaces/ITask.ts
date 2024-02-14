export interface ITime {
    day: number,
    week: number,
    month: number
}

export default interface ITask {
    id: number
    name: string
    bgc: string
    time: ITime
    authorID: string
}