import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
    results: Movie[];
    total_pages: number;
}

export async function fetchMovies(
    query: string,
    page: number
): Promise<MoviesResponse> {
    const response = await axios.get<MoviesResponse>(BASE_URL, {
        params: {
            query,
            page,
            language: "en-US",
        },
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });

    return response.data;
}

