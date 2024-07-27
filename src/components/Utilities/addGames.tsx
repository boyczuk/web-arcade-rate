const addGames = async (
    userId: string,
    gameId: number,
    gameName: string,
    callback: (data: any) => void,
    rating: number,
    notes: string
) => {
    const requestBody = {
        userId: userId,
        gameId: gameId,
        gameName: gameName,
        rating: rating,
        notes: notes
    };

    try {
        const response = await fetch('http://localhost:3001/add-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error('Error adding game:', error);
    }
};

export default addGames;
