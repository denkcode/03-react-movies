import axios from "axios"
import { Movie } from '../types/movie'

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<{ results: Movie[] }>(
        "https://api.themoviedb.org/3/search/movie",
        {
            params: {
                query,
            },

            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
    );
    return response.data.results;
}