import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (
    query: string,
    page: number
): Promise<MoviesResponse> => {
    const response = await axios.get<MoviesResponse>(BASE_URL, {
        params: {
            query,
            page,
            language: "en-US",
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });

    return response.data;
};
