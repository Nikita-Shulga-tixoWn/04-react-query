import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import css from "./App.module.css";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        setMovies([]);
        setError(false);
        setLoading(true);

        try {
            const data = await fetchMovies(query);

            if (data.length === 0) {
                toast.error("No movies found for your request.");
            }

            setMovies(data);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />

            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={setSelectedMovie} />
            )}

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            <Toaster position="top-right" />
        </div>
    );
}
