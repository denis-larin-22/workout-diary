import { useState } from 'react';
import { IWorkoutValue } from '../../api/types';
import '../../style/index.css';
import { removeItem } from '../../api/remove';
import { editItem } from '../../api/edit';

export const WorkoutItem = ({ token, idItem, workoutItem, updateList }: { token: string, idItem: number, workoutItem: IWorkoutValue, updateList: () => void }) => {
    const initValue = workoutItem;

    const [currentWorkoutValue, setCurrentWorkoutValue] = useState(initValue);
    const [isOpen, setIsOpen] = useState(false);
    const [toggleSaveBtn, setToggleSaveBtn] = useState(false);

    const deleteHandler = async (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmation = confirm('Are you sure you want to delete this workout?');
        if (confirmation) {
            removeItem(id, token);
            updateList();
        }
        return;
    }

    return (
        <div
            className='workout-item'
            onClick={() => setIsOpen(true)}
        >
            <input type="text"
                className="workout-item__name"
                value={currentWorkoutValue.name}
                onChange={(e) => {
                    setCurrentWorkoutValue({
                        ...currentWorkoutValue,
                        name: e.target.value
                    })
                    checkChanges(initValue.name, e.target.value, setToggleSaveBtn)
                }}
            />
            <input
                type='text'
                className="workout-item__date"
                value={currentWorkoutValue.date}
                onChange={(e) => {
                    setCurrentWorkoutValue({
                        ...currentWorkoutValue,
                        date: e.target.value
                    })
                    checkChanges(initValue.date, e.target.value, setToggleSaveBtn)

                }}
            />
            <textarea
                className={`workout-item__text ${isOpen && 'workout-item__text_open'}`}
                value={currentWorkoutValue.workout}
                onChange={(e) => {
                    setCurrentWorkoutValue({
                        ...currentWorkoutValue,
                        workout: e.target.value
                    })
                    checkChanges(initValue.workout, e.target.value, setToggleSaveBtn)
                }}
            ></textarea>
            <button
                className='workout-item__delete'
                onClick={() => deleteHandler(idItem)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill='gray' /></svg>
            </button>
            {toggleSaveBtn && <button
                className='workout-item__save'
                onClick={() => {
                    editItem(token, idItem, currentWorkoutValue);
                    setToggleSaveBtn(false);
                }}>Сохранить</button>}
        </div >
    )
}

function checkChanges(initValue: string, currentValue: string, toggleHandler: (value: boolean) => void) {
    return (initValue !== currentValue) ? toggleHandler(true) : toggleHandler(false);
}