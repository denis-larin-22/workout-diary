import { useEffect, useState } from "react"
import { auth } from "../../api/auth";
import { post } from "../../api/post";
import { IWorkoutValue } from "../../api/types";

export const InputForm = () => {
    const [isVissible, setIsVissible] = useState(false);

    const initInputValue: IWorkoutValue = {
        name: '',
        workout: '',
        date: getCurrentDate(),
    }

    const [inputValue, setInputValue] = useState(initInputValue);
    const [token, setToken] = useState('');

    useEffect(() => {
        auth()
            .then(result => setToken(result))
            .catch(err => console.error(err))
    }, [])


    return (
        <div className="input-form">
            <h2 className="">Add new workout</h2>
            <input
                type="text"
                className=""
                placeholder="name"
                value={inputValue.name}
                onChange={(e) => {
                    setInputValue({
                        ...inputValue,
                        name: e.target.value,
                    })
                }}
            />
            <textarea
                placeholder="workout"
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
                <button className="" onClick={() => post(token, inputValue)}>Save</button>
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