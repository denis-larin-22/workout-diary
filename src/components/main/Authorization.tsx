import { useState } from 'react';
import { Logo } from './Logo';

export const Authorization = ({ loginHandler }: { loginHandler: () => void }) => {
    const init = { name: '', login: '' };
    const [initValue, setInitValue] = useState(init);

    return (
        <main className="authorization">
            <div className="">
                <label
                    htmlFor="name"
                >Твоё имя:</label>
                <Logo />
            </div>
            <input
                type="text"
                id="name"
                value={initValue.name}
                onChange={(e) => setInitValue({ ...initValue, name: e.target.value })}
            />

            <label
                htmlFor="login"
            >Логин:</label>
            <input
                type="text"
                id="login"
                value={initValue.login}
                onChange={(e) => setInitValue({ ...initValue, login: e.target.value })}
            />

            {
                initValue.login.length !== 0 &&
                initValue.name.length !== 0 &&
                <button onClick={() => {
                    localStorage.setItem('trainig_diary_login', JSON.stringify(initValue));
                    setInitValue(init);
                    loginHandler();
                }}>Войти</button>
            }
        </main>
    )
}
