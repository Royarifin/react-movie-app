// src/components/MovieSearch.jsx
import React, { useState, useEffect } from 'react'; // Impor useEffect
import './MovieSearch.css';

const MovieSearch = () => {
    // GANTI DENGAN API KEY TMDB ANDA
    const apiKey = '';

    const [query, setQuery] = useState(''); // State untuk teks pencarian
    const [movies, setMovies] = useState([]); // State untuk menyimpan daftar film
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fungsi untuk mengambil film populer (atau film apa pun)
    const fetchMovies = async (searchQuery) => {
        setLoading(true);
        setError(null);
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

        if (searchQuery) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Gagal mengambil data film.');
            }
            const data = await response.json();
            setMovies(data.results); // Simpan hasil film ke state
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect untuk mengambil film populer saat komponen pertama kali dimuat
    useEffect(() => {
        fetchMovies(); // Panggil fetchMovies tanpa query pencarian
    }, []); // Array kosong berarti "jalankan hanya satu kali"

    const handleSearch = () => {
        fetchMovies(query);
    };

    return (
        <div className="movie-app">
            <h1>Pencarian Film</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Cari film favoritmu..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button onClick={handleSearch}>Cari</button>
            </div>

            {loading && <p>Memuat...</p>}
            {error && <p>Error: {error}</p>}
            
            <div className="movies-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;