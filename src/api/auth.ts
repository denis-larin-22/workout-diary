export const auth = async (): Promise<string> => {
    const key = 'den4ikkach'
    const token = await fetch('https://todo.hillel.it/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            value: key
        })
    });

    const tokenValue = await token.json();
    return tokenValue.access_token;
}