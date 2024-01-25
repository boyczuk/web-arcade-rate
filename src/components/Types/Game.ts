export interface Game {
    name: string;
    id: number;
    genres?: string[];
    platforms?: string[]; 
    cover?: {
        image_id: string;
    };
}
