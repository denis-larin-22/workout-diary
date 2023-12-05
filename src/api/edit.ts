import { IWorkoutValue } from "./types";

export const editItem = async (token: string, idItem: number, editedNote: IWorkoutValue) => {
    return await fetch(`https://todo.hillel.it/todo/${idItem}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            value: JSON.stringify(editedNote),
            priority: 1
        })
    })
}