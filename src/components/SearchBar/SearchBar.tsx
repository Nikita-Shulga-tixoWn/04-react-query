import type { FormEvent } from "react";
import toast from "react-hot-toast";

import css from "./SearchBar.module.css";

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const query = (form.elements.namedItem("query") as HTMLInputElement).value.trim();

        if (!query) {
            toast.error("Please enter your search query.");
            return;
        }

        onSubmit(query);
        form.reset();
    };

    return (
        <header className={css.header}>
            <div className={css.container}>
                <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>

                <form className={css.form} onSubmit={handleSubmit}>
                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={css.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}