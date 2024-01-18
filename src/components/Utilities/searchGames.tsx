const searchGames = async (searchTerm: string, callback: (data: any) => void) => {
    try {
        const response = await fetch(`http://localhost:3001/search-games?q=${searchTerm}`);
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
};

export default searchGames;
