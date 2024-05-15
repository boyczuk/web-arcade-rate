const addGames = async (gameName: string, callback: (data: any) => void) => {
    try {
        const response = await fetch(`http://localhost:3001/add-game?q=${gameName}`);
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
};

export default addGames;
