import { IListItem } from "./types";

export const getList = async (token: string): Promise<IListItem[]> => {
    const response = await fetch("https://todo.hillel.it/todo", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });

    const list = await response.json();
    const parsedValue = list.map((item: IListItem) => {
        if (typeof item.value === 'string') {
            return {
                ...item,
                value: JSON.parse(item.value),
            }
        }
        return item;
    })
    return parsedValue;
}