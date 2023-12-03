import { IListItem } from "../../api/types"
import { WorkoutItem } from "../workout-item/WorkoutItem"

export const WorkoutList = ({ workoutList, updateList }: { workoutList: IListItem[] | null, updateList: () => void }) => {
    return (
        <ul className="workout-list">
            {workoutList?.map((item) => (
                <li key={item._id} className="">
                    <WorkoutItem
                        idItem={item._id}
                        workoutItem={item.value}
                        updateList={updateList}
                    />
                </li>
            ))}
        </ul>
    )
}