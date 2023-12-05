export const auth = async (login: string): Promise<string> => {
    // const key = 'den4ikkach'
    const token = await fetch('https://todo.hillel.it/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            value: login
        })
    });

    const tokenValue = await token.json();
    return tokenValue.access_token;
}