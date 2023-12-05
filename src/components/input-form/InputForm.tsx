import { useState } from "react"
import { post } from "../../api/post";
import { IWorkoutValue } from "../../api/types";

export const InputForm = ({ token, updateList }: { token: string, updateList: () => void }) => {
    const initInputValue: IWorkoutValue = {
        name: '',
        workout: '',
        date: getCurrentDate(),
    }

    const [inputValue, setInputValue] = useState(initInputValue);

    const saveHandler = () => {
        post(token, inputValue);
        setInputValue(initInputValue);
        updateList();
    }

    return (
        <div className="input-form">
            <h2 className="">Добавить тренировку</h2>
            <input
                type="text"
                className=""
                placeholder="Группа мышц"
                value={inputValue.name}
                onChange={(e) => {
                    setInputValue({
                        ...inputValue,
                        name: e.target.value,
                    })
                }}
            />
            <textarea
                placeholder="Тренировка"
                value={inputValue.workout}
                onChange={(e) => {
                    setInputValue({
                        ...inputValue,
                        workout: e.target.value,
                    })
                }}
            ></textarea>
            <div className="">
                <input
                    type="text"
                    className=""
                    value={inputValue.date}
                    onChange={(e) => {
                        setInputValue({
                            ...inputValue,
                            date: e.target.value,
                        })
                    }}
                />
                {
                    inputValue.name.length !== 0 &&
                    inputValue.workout.length !== 0 &&
                    <button onClick={() => saveHandler()}>Сохранить</button>
                }
            </div>
        </div>
    )
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(2, 4);
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${day}.${month}.${year}`;
}