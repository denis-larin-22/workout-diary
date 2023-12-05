import { useState } from "react";
import { IListItem } from "../../api/types"
import { WorkoutItem } from "../workout-item/WorkoutItem"

export const WorkoutList = ({ token, workoutList, updateList }: { token: string, workoutList: IListItem[], updateList: () => void }) => {
    const [currentList, setCurrentList] = useState(workoutList)
    const keyWorkoutNames = getWorkoutsName(workoutList);

    return (
        <div className="workout-list">
            <nav>
                {
                    keyWorkoutNames.map((item, index) => (
                        <button
                            key={index}
                            className="workout-list__sort"
                            onClick={() => {
                                const sortedList = sortByKey(item, workoutList);
                                setCurrentList(sortedList);
                            }}
                        >{`#${item}`}</button>
                    ))
                }
            </nav>
            <ul>
                {currentList.map((item) => (
                    <li key={item._id}>
                        <WorkoutItem
                            token={token}
                            idItem={item._id}
                            workoutItem={item.value}
                            updateList={updateList}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function getWorkoutsName(workoutList: IListItem[]) {
    const keyWords = new Set(workoutList.map((item) => item.value.name));
    return Array.from(keyWords);
}

function sortByKey(key: string, array: IListItem[]): IListItem[] {
    return array.filter((item) => item.value.name === key);
}