export interface IWorkoutValue {
    name: string,
    workout: string,
    date: string
}

export interface IListItem {
    addedAt: string,
    checked: boolean,
    priority: number,
    updatedAt: null | string,
    user: string,
    value: IWorkoutValue,
    _id: number
}
