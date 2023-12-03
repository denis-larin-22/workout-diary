export const removeItem = async (id: number, token: string) => {
    try {
        const response = await fetch(`https://todo.hillel.it/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error removing item:', error);
    }
} 