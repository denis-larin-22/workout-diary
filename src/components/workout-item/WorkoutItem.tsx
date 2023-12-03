import { useState } from 'react';
import { IWorkoutValue } from '../../api/types';
import '../../style/index.css';
import { auth } from '../../api/auth';
import { removeItem } from '../../api/remove';

export const WorkoutItem = ({ idItem, workoutItem, updateList }: { idItem: number, workoutItem: IWorkoutValue, updateList: () => void }) => {
    const { name, date, workout } = workoutItem;
    const [isOpen, setIsOpen] = useState(false);
    const deleteHandler = async (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmation = confirm('Are you sure you wont to delete this workout?');
        if (confirmation) {
            const token: string = await auth();
            removeItem(id, token);
            updateList();
        }
        return;
    }

    return (
        <div className='workout-item' onClick={() => setIsOpen(!isOpen)}>
            <h5 className="">{name}</h5>
            <p className="workout-item__date">{date}</p>
            <textarea
                className={`workout-item__text ${isOpen && 'workout-item__text_open'}`}
                value={workout}
            ></textarea>
            <button
                onClick={() => deleteHandler(idItem)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill='gray' /></svg>
            </button>
        </div >
    )
}