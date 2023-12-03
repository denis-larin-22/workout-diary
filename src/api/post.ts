import { IWorkoutValue } from "./types";


export const post = async (token: string, objWorkout: IWorkoutValue) => {
    const response = await fetch("https://todo.hillel.it/todo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            value: JSON.stringify(objWorkout),
            priority: 1
        })
    });

    return await response.json();
} 