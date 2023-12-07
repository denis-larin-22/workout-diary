import '../../style/index.css';
import { useEffect, useState } from 'react';
import { InputForm } from '../input-form/InputForm';
import { WorkoutList } from '../workout-list/WorkoutList';
import { auth } from '../../api/auth';
import { getList } from '../../api/getList';
import { IListItem } from '../../api/types';
import { Logo } from './Logo';
import { Authorization } from './Authorization';

interface IAuthUserObj {
    name: string,
    login: string
}

export const Main = () => {
    const loginObj: IAuthUserObj | null = loginFromLocalStorage();

    const [isAuthorized, setIsAuthorized] = useState(loginObj !== null);
    const [tokenValue, setTokenValue] = useState('');
    const [list, setList] = useState<IListItem[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const updateWorkoutList = async (loginObj: IAuthUserObj | null) => {
        if (loginObj !== null) {
            try {
                setLoading(true);
                const token: string = await auth(loginObj.login);
                setTokenValue(token);
                const fetchedList: IListItem[] = await getList(token);
                setList(fetchedList.reverse());
            } catch (error) {
                console.error("Error fetching workout list:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    const logoutHandler = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmation = confirm('Вы уверены, что хотите выйти?');
        if (confirmation) {
            localStorage.removeItem('trainig_diary_login');
            setIsAuthorized(false);
        }
        return;
    }

    useEffect(() => {
        if (loginObj !== null) {
            updateWorkoutList(loginObj);
        }
    }, [setList])


    return (
        <div className="container main">
            {!isAuthorized ?
                <Authorization
                    loginHandler={() => {
                        const updatedLoginObj = loginFromLocalStorage();
                        updateWorkoutList(updatedLoginObj);
                        setIsAuthorized(true);
                    }} />
                :
                <>
                    <header className="main__header">
                        <Logo />
                        <p>Your workout diary</p>
                        <div>
                            <h1>Привет, {loginObj?.name}!</h1>
                            <button onClick={logoutHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                            </button>
                        </div>
                    </header>
                    <InputForm
                        token={tokenValue}
                        updateList={() => updateWorkoutList(loginObj)}
                    />
                    {
                        loading ?
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" fill='gray' /></svg>
                            :
                            <WorkoutList
                                token={tokenValue}
                                workoutList={list}
                                updateList={() => updateWorkoutList(loginObj)}
                            />
                    }
                </>
            }
        </div >
    )
}


function loginFromLocalStorage(): IAuthUserObj | null {
    const resultValue = localStorage.getItem('trainig_diary_login');
    if (resultValue !== null) {
        return JSON.parse(resultValue);
    };
    return null;
}